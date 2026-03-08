import { Component, inject, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { RpgSessionService } from '../../services/rpg-session-service';
import { RpgItemService } from '../../services/rpg-item-service';
import { RpgSession } from '../../schema/rpg-session';
import { AddRpgSession } from '../add-rpg-session/add-rpg-session';

@Component({
    selector: 'app-session-detail',
    imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterLink],
    templateUrl: './session-detail.html',
    styleUrl: './session-detail.css',
})
export class SessionDetail {
    private route = inject(ActivatedRoute);
    private sessionService = inject(RpgSessionService);
    private rpgItemService = inject(RpgItemService);
    private dialog = inject(MatDialog);

    private sessionId = toSignal(
        this.route.paramMap.pipe(map((params) => Number(params.get('id')))),
        { initialValue: 0 },
    );

    session = computed(() =>
        this.sessionService.listSignal().find((s) => s.metadata.id === this.sessionId()),
    );

    getGameTitle(gameId: number): string {
        const item = this.rpgItemService.listSignal().find((i) => i.metadata.id === gameId);
        return item ? item.title : 'Unknown Game';
    }

    formatDate(date: Date | string): string {
        const d = new Date(date);
        return d.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    openEditModal(): void {
        if (!this.session()) return;
        this.dialog.open(AddRpgSession, {
            data: { session: this.session() },
            width: '600px',
        });
    }
}
