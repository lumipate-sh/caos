import { Component, inject, ChangeDetectionStrategy, computed } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { RpgItemService } from '../../services/rpg-item-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
    MatAutocompleteModule,
    type MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { map, startWith } from 'rxjs';
import type { RpgItem } from '../../schema/rpg-item';

export interface AddRpgItemModalData {
    item?: RpgItem;
}

@Component({
    selector: 'app-add-rpg-item-modal',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatRadioModule,
        MatDialogModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatInputModule,
        MatAutocompleteModule,
        MatChipsModule,
        MatIconModule,
    ],
    templateUrl: './add-rpg-item-modal.html',
    styleUrl: './add-rpg-item-modal.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddRpgItemModal {
    protected rpgItem = inject(RpgItemService);
    private dialogRef = inject(MatDialogRef<AddRpgItemModal>);
    private data = inject<AddRpgItemModalData>(MAT_DIALOG_DATA);

    isEditMode: boolean = !!this.data?.item;
    editingItem: RpgItem | undefined = this.data?.item;


    tags = computed(() => this.rpgItem.tagsSignal());

    tagInput = new FormControl('');

    filteredTags = toSignal(
        this.tagInput.valueChanges.pipe(
            startWith(''),
            map((value) => this._filter(value || '')),
        ),
        { initialValue: [] as string[] },
    );

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.tags().filter((tag) => tag.toLowerCase().includes(filterValue));
    }

    addTag(value: string): void {
        const trimmedValue = value.trim();
        if (trimmedValue) {
            const currentTags = this.newRpgItemForm.get('itemTags')?.value || [];
            if (!currentTags.includes(trimmedValue)) {
                this.newRpgItemForm.patchValue({
                    itemTags: [...currentTags, trimmedValue],
                });
            }
        }
        this.tagInput.setValue('');
    }

    onEnterKey(event: Event): void {
        event.preventDefault();
        const value = this.tagInput.value || '';
        this.addTag(value);
    }

    removeTag(tag: string): void {
        const currentTags = this.newRpgItemForm.get('itemTags')?.value || [];
        const index = currentTags.indexOf(tag);
        if (index >= 0) {
            const updatedTags = [...currentTags];
            updatedTags.splice(index, 1);
            this.newRpgItemForm.patchValue({ itemTags: updatedTags });
        }
    }

    onTagSelected(event: MatAutocompleteSelectedEvent): void {
        const value = event.option.value;
        if (value) {
            const currentTags = this.newRpgItemForm.get('itemTags')?.value || [];
            if (!currentTags.includes(value)) {
                this.newRpgItemForm.patchValue({
                    itemTags: [...currentTags, value],
                });
            }
        }
        this.tagInput.setValue('');
    }

    get selectedTags(): string[] {
        return this.newRpgItemForm.get('itemTags')?.value || [];
    }

    newRpgItemForm: FormGroup;

    constructor() {
        const item = this.editingItem;

        this.newRpgItemForm = new FormGroup({
            title: new FormControl(item?.title || ''),
            description: new FormControl(item?.description || ''),
            authors: new FormControl(item?.authors?.join(', ') || ''),
            itemType: new FormControl(item?.itemType || ''),
            itemTags: new FormControl(item?.itemTags || []),
            yearReleased: new FormControl(item?.yearReleased || null),
            isOwned: new FormControl(item?.isOwned || false),
            onWishList: new FormControl(item?.onWishList || false),
            userRating: new FormControl(item?.userRating || null),
            website: new FormControl(item?.website || ''),
            notes: new FormControl(item?.notes || ''),
        });
    }

    onSubmit(): void {
        const formValue = this.newRpgItemForm.value;

        const authorsValue = formValue.authors || '';
        const authorsArray = authorsValue
            .split(',')
            .map((a: string) => a.trim())
            .filter((a: string) => a !== '');

        const itemData = {
            title: formValue.title || '',
            description: formValue.description || '',
            authors: authorsArray,
            itemType: formValue.itemType || 'core',
            itemTags: formValue.itemTags || [],
            yearReleased: formValue.yearReleased ? Number(formValue.yearReleased) : undefined,
            isOwned: formValue.isOwned || false,
            onWishList: formValue.onWishList || false,
            userRating: formValue.userRating ? Number(formValue.userRating) : 0,
            website: formValue.website || '',
            notes: formValue.notes || '',
        };

        if (this.isEditMode && this.editingItem) {
            this.rpgItem.updateRpgItem(this.editingItem.metadata.id, itemData);
        } else {
            this.rpgItem.addRpgItem(itemData);
        }

        this.dialogRef.close(true);
    }
}
