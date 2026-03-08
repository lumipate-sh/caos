import { Component, inject, computed } from '@angular/core';
import { RpgItemService } from '../../services/rpg-item-service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-top-games',
    imports: [MatCardModule, MatIconModule],
    templateUrl: './top-games.html',
    styleUrl: './top-games.css',
})
export class TopGames {
    private rpgItemService = inject(RpgItemService);

    private rpgItems = computed(() =>
        this.rpgItemService.listSignal().filter((item) => item.metadata.active),
    );

    topRatedGames = computed(() => {
        const items = this.rpgItems();
        return [...items]
            .sort((a, b) => {
                if (b.userRating !== a.userRating) {
                    return b.userRating - a.userRating;
                }
                return (
                    new Date(b.metadata.dateAdded).getTime() -
                    new Date(a.metadata.dateAdded).getTime()
                );
            })
            .slice(0, 5);
    });
}
