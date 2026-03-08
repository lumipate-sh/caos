import { Component, inject, computed } from '@angular/core';
import { RpgItemService } from '../../services/rpg-item-service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-collection-stats',
    imports: [MatCardModule, MatIconModule],
    templateUrl: './collection-stats.html',
    styleUrl: './collection-stats.css',
})
export class CollectionStats {
    private rpgItemService = inject(RpgItemService);

    ownedCount = computed(
        () =>
            this.rpgItemService.listSignal().filter((item) => item.metadata.active && item.isOwned)
                .length,
    );

    wishlistCount = computed(
        () =>
            this.rpgItemService
                .listSignal()
                .filter((item) => item.metadata.active && item.onWishList).length,
    );
}
