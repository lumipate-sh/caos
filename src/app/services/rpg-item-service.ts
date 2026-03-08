import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { LocalStorageUtils } from './local-storage-utils';
import { RpgItem, RpgItemData } from '../schema/rpg-item';
import { ListMetadata } from '../schema/list-metadata';
import { ItemMetadata } from '../schema/item-metadata';

@Injectable({
    providedIn: 'root',
})
export class RpgItemService {
    protected mem = inject(LocalStorageUtils);

    private isInitialized = false;

    private getInitialData(): RpgItemData {
        if (typeof localStorage === 'undefined') {
            return this.getDefaultData();
        }
        const loaded = this.mem.loadFromMem('rpgItemData');
        if (loaded[0] && loaded[1]) {
            this.isInitialized = true;
            return loaded[1] as RpgItemData;
        }
        return this.getDefaultData();
    }

    private getDefaultData(): RpgItemData {
        return {
            metadata: { lastIdAdded: 0, nrItemsDeleted: 0 },
            list: [],
            tags: [],
        };
    }

    private retrievedRpgItemData: RpgItemData = this.getInitialData();

    private rpgItemDataSignal = signal(this.retrievedRpgItemData);

    readonly metadataSignal = computed(() => this.rpgItemDataSignal().metadata);
    readonly listSignal = computed(() => this.rpgItemDataSignal().list);
    readonly tagsSignal = computed(() => this.rpgItemDataSignal().tags);

    constructor() {
        effect(() => {
            if (!this.isInitialized) {
                this.isInitialized = true;
                return;
            }
            this.mem.storeInMem('rpgItemData', this.rpgItemDataSignal());
        });
    }

    // signal updaters
    updateMetadata(metadata: ListMetadata) {
        this.rpgItemDataSignal.update((otherData) => ({ ...otherData, metadata }));
    }

    updateList(list: RpgItem[]) {
        this.rpgItemDataSignal.update((otherData) => ({ ...otherData, list }));
    }

    updateTags(tags: string[]) {
        this.rpgItemDataSignal.update((otherData) => ({ ...otherData, tags }));
    }

    //TODO: if needed solve this, otherwise delete

    // updateAllData(rpgItemData: RpgItemData) {
    //     this.rpgItemDataSignal.update(rpgItemData);
    // }

    addRpgItem(data: Omit<RpgItem, 'metadata'>): void {
        // update metadata
        let currentListMetadata = this.metadataSignal();
        const newId = currentListMetadata.lastIdAdded + 1;
        currentListMetadata.lastIdAdded = newId;

        this.updateMetadata(currentListMetadata);

        // assemble item
        let newItemMetadata: ItemMetadata = {
            id: newId,
            dateAdded: new Date(Date.now()),
            datesUpdated: [],
            active: true,
        };

        const assembledRpgItem: RpgItem = {
            ...data,
            metadata: newItemMetadata,
        };

        const updatedRpgItemList = [...this.listSignal(), assembledRpgItem];
        this.updateList(updatedRpgItemList);

        //update tag list
        const tagsInMem: string[] = this.tagsSignal();
        const tagsInNewItem: string[] = data.itemTags;

        const newTags: string[] = tagsInNewItem.filter((tag) => !tagsInMem.includes(tag));

        const hasNewTags = newTags.length > 0;

        if (hasNewTags) {
            const updatedTagList = [...tagsInMem, ...newTags];
            this.updateTags(updatedTagList);
        }
        return;
    }

    updateRpgItem(id: number, data: Omit<RpgItem, 'metadata'>): void {
        const currentList = this.listSignal();
        const itemIndex = currentList.findIndex((item) => item.metadata.id === id);

        if (itemIndex === -1) return;

        const existingItem = currentList[itemIndex];

        const updatedItem: RpgItem = {
            ...data,
            metadata: {
                ...existingItem.metadata,
                datesUpdated: [...existingItem.metadata.datesUpdated, new Date(Date.now())],
            },
        };

        const updatedList = [...currentList];
        updatedList[itemIndex] = updatedItem;
        this.updateList(updatedList);

        // Update tags list
        const tagsInMem: string[] = this.tagsSignal();
        const tagsInUpdatedItem: string[] = data.itemTags;
        const newTags = tagsInUpdatedItem.filter((tag) => !tagsInMem.includes(tag));

        if (newTags.length > 0) {
            const updatedTagList = [...tagsInMem, ...newTags];
            this.updateTags(updatedTagList);
        }
    }

    getItemById(id: number): RpgItem | undefined {
        return this.listSignal().find((item) => item.metadata.id === id);
    }
}
