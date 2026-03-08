import { Component, inject, computed } from '@angular/core';
import { RpgItemService } from '../../services/rpg-item-service';
import { RpgSessionService } from '../../services/rpg-session-service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormatDatePipe } from '../../pipes/format-date-pipe';

@Component({
    selector: 'app-sessions-stats',
    imports: [MatCardModule, MatIconModule, FormatDatePipe],
    templateUrl: './sessions-stats.html',
    styleUrl: './sessions-stats.css',
})
export class SessionsStats {
    private rpgItemService = inject(RpgItemService);
    private sessionService = inject(RpgSessionService);

    private activeSessions = computed(() =>
        this.sessionService.listSignal().filter((s) => s.metadata.active),
    );

    private rpgItems = computed(() =>
        this.rpgItemService.listSignal().filter((item) => item.metadata.active),
    );

    totalSessions = computed(() => this.activeSessions().length);

    latestSession = computed(() => {
        const sessions = this.activeSessions();
        if (sessions.length === 0) return null;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const pastSessions = sessions
            .filter((s) => new Date(s.sessionDate) <= today)
            .sort((a, b) => new Date(b.sessionDate).getTime() - new Date(a.sessionDate).getTime());

        return pastSessions[0] || null;
    });

    upcomingSessions = computed(() => {
        const sessions = this.activeSessions();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return sessions
            .filter((s) => new Date(s.sessionDate) > today)
            .sort((a, b) => new Date(a.sessionDate).getTime() - new Date(b.sessionDate).getTime());
    });

    nextSession = computed(() => {
        const upcoming = this.upcomingSessions();
        return upcoming[0] || null;
    });

    getGameName(gameId: number): string {
        const item = this.rpgItems().find((i) => i.metadata.id === gameId);
        return item ? item.title : 'Unknown Game';
    }
}
