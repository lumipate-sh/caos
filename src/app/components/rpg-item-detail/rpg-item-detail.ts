import { Component, inject, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { RpgItemService } from '../../services/rpg-item-service';
import { AddRpgItemModal } from '../add-rpg-item-modal/add-rpg-item-modal';
import { FormatDatePipe } from '../../pipes/format-date-pipe';

@Component({
    selector: 'app-rpg-item-detail',
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule,
        RouterLink,
        FormatDatePipe,
    ],
    templateUrl: './rpg-item-detail.html',
    styleUrl: './rpg-item-detail.css',
})
export class RpgItemDetail {
    private route = inject(ActivatedRoute);
    private rpgItemService = inject(RpgItemService);
    private dialog = inject(MatDialog);

    private itemId = toSignal(this.route.paramMap.pipe(map((params) => Number(params.get('id')))), {
        initialValue: 0,
    });

    item = computed(() =>
        this.rpgItemService.listSignal().find((i) => i.metadata.id === this.itemId()),
    );

    openEditModal(): void {
        if (!this.item()) return;
        this.dialog.open(AddRpgItemModal, {
            data: { item: this.item() },
            width: '600px',
        });
    }
}
