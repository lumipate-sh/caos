import { Component } from '@angular/core';
import { CollectionStats } from '../collection-stats/collection-stats';
import { SessionsStats } from '../sessions-stats/sessions-stats';
import { TopGames } from '../top-games/top-games';

@Component({
    selector: 'app-dashboard',
    imports: [CollectionStats, SessionsStats, TopGames],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.css',
})
export class Dashboard {}
