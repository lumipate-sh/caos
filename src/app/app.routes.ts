import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { RpgItemList } from './components/rpg-item-list/rpg-item-list';
import { SessionList } from './components/session-list/session-list';
import { RpgItemDetail } from './components/rpg-item-detail/rpg-item-detail';
import { SessionDetail } from './components/session-detail/session-detail';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: Dashboard },
    { path: 'items', component: RpgItemList },
    { path: 'items/:id', component: RpgItemDetail },
    { path: 'sessions', component: SessionList },
    { path: 'sessions/:id', component: SessionDetail },
];
