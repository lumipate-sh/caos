import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RpgItemService } from '../../services/rpg-item-service';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
    selector: 'app-rpg-item-list',
    imports: [
        FormsModule,
        RouterLink,
        MatListModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCheckboxModule,
    ],
    templateUrl: './rpg-item-list.html',
    styleUrl: './rpg-item-list.css',
})
export class RpgItemList {
    private rpgItemService = inject(RpgItemService);

    allTags = this.rpgItemService.tagsSignal();

    showOwned: boolean | null = null;
    showWishlist: boolean | null = null;
    selectedTags: string[] = [];

    filteredItems = this.getFilteredItems();

    private getFilteredItems() {
        let items = this.rpgItemService.listSignal().filter((item) => item.metadata.active);

        if (this.showOwned === true) {
            items = items.filter((item) => item.isOwned);
        } else if (this.showOwned === false) {
            items = items.filter((item) => !item.isOwned);
        }

        if (this.showWishlist === true) {
            items = items.filter((item) => item.onWishList);
        } else if (this.showWishlist === false) {
            items = items.filter((item) => !item.onWishList);
        }

        if (this.selectedTags.length > 0) {
            items = items.filter(
                (item) =>
                    item.itemTags && item.itemTags.some((tag) => this.selectedTags.includes(tag)),
            );
        }

        return items;
    }

    applyFilters(): void {
        this.filteredItems = this.getFilteredItems();
    }

    clearFilters(): void {
        this.showOwned = null;
        this.showWishlist = null;
        this.selectedTags = [];
        this.filteredItems = this.getFilteredItems();
    }
}
