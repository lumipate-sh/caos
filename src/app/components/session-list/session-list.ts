import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RpgSessionService } from '../../services/rpg-session-service';
import { RpgItemService } from '../../services/rpg-item-service';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormatDatePipe } from '../../pipes/format-date-pipe';

@Component({
    selector: 'app-session-list',
    imports: [
        FormsModule,
        RouterLink,
        MatListModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FormatDatePipe,
    ],
    templateUrl: './session-list.html',
    styleUrl: './session-list.css',
})
export class SessionList {
    private sessionService = inject(RpgSessionService);
    private rpgItemService = inject(RpgItemService);

    rpgItems = this.rpgItemService.listSignal().filter((item) => item.metadata.active);

    startDate: Date | null = null;
    endDate: Date | null = null;
    selectedGameId: number | null = null;

    filteredSessions = this.getFilteredSessions();

    private getFilteredSessions() {
        let sessions = this.sessionService
            .listSignal()
            .filter((session) => session.metadata.active);

        if (this.selectedGameId !== null) {
            sessions = sessions.filter((session) => session.gameId === this.selectedGameId);
        }

        if (this.startDate) {
            const start = new Date(this.startDate);
            start.setHours(0, 0, 0, 0);
            sessions = sessions.filter((session) => {
                const sessionDate = new Date(session.sessionDate);
                return sessionDate >= start;
            });
        }

        if (this.endDate) {
            const end = new Date(this.endDate);
            end.setHours(23, 59, 59, 999);
            sessions = sessions.filter((session) => {
                const sessionDate = new Date(session.sessionDate);
                return sessionDate <= end;
            });
        }

        return sessions;
    }

    applyFilters(): void {
        this.filteredSessions = this.getFilteredSessions();
    }

    getGameTitle(gameId: number): string {
        const item = this.rpgItems.find((i) => i.metadata.id === gameId);
        return item ? item.title : 'Unknown Game';
    }

    clearFilters(): void {
        this.startDate = null;
        this.endDate = null;
        this.selectedGameId = null;
        this.filteredSessions = this.getFilteredSessions();
    }
}
