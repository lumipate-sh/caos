import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { LocalStorageUtils } from './local-storage-utils';
import { RpgSession, RpgSessionData } from '../schema/rpg-session';
import { ListMetadata } from '../schema/list-metadata';
import { ItemMetadata } from '../schema/item-metadata';

@Injectable({
    providedIn: 'root',
})
export class RpgSessionService {
    protected mem = inject(LocalStorageUtils);
    private isInitialized = false;

    private getInitialData(): RpgSessionData {
        if (typeof localStorage === 'undefined') {
            return this.getDefaultData();
        }
        const loaded = this.mem.loadFromMem('rpgSessionData');
        if (loaded[0] && loaded[1]) {
            this.isInitialized = true;
            return loaded[1] as RpgSessionData;
        }
        return this.getDefaultData();
    }

    private getDefaultData(): RpgSessionData {
        return {
            metadata: { lastIdAdded: 0, nrItemsDeleted: 0 },
            list: [],
        };
    }

    private retrievedRpgSessionData: RpgSessionData = this.getInitialData();

    private rpgSessionDataSignal = signal(this.retrievedRpgSessionData);

    readonly metadataSignal = computed(() => this.rpgSessionDataSignal().metadata);
    readonly listSignal = computed(() => this.rpgSessionDataSignal().list);

    constructor() {
        effect(() => {
            if (!this.isInitialized) {
                this.isInitialized = true;
                return;
            }
            this.mem.storeInMem('rpgSessionData', this.rpgSessionDataSignal());
        });
    }

    updateMetadata(metadata: ListMetadata) {
        this.rpgSessionDataSignal.update((otherData) => ({ ...otherData, metadata }));
    }

    updateList(list: RpgSession[]) {
        this.rpgSessionDataSignal.update((otherData) => ({ ...otherData, list }));
    }

    addSession(data: Omit<RpgSession, 'metadata'>): void {
        let currentListMetadata = this.metadataSignal();
        const newId = currentListMetadata.lastIdAdded + 1;
        currentListMetadata.lastIdAdded = newId;

        this.updateMetadata(currentListMetadata);

        let newItemMetadata: ItemMetadata = {
            id: newId,
            dateAdded: new Date(Date.now()),
            datesUpdated: [],
            active: true,
        };

        const assembledRpgSession: RpgSession = {
            ...data,
            metadata: newItemMetadata,
        };

        const updatedSessionList = [...this.listSignal(), assembledRpgSession];
        this.updateList(updatedSessionList);
    }

    updateSession(id: number, data: Omit<RpgSession, 'metadata'>): void {
        const currentList = this.listSignal();
        const sessionIndex = currentList.findIndex((s) => s.metadata.id === id);

        if (sessionIndex === -1) return;

        const existingSession = currentList[sessionIndex];

        const updatedSession: RpgSession = {
            ...data,
            metadata: {
                ...existingSession.metadata,
                datesUpdated: [...existingSession.metadata.datesUpdated, new Date(Date.now())],
            },
        };

        const updatedList = [...currentList];
        updatedList[sessionIndex] = updatedSession;
        this.updateList(updatedList);
    }

    getSessionById(id: number): RpgSession | undefined {
        return this.listSignal().find((s) => s.metadata.id === id);
    }
}
