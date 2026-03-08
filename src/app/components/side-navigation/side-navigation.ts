import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-side-navigation',
    imports: [RouterLink, RouterLinkActive, MatIconModule, MatButtonModule],
    templateUrl: './side-navigation.html',
    styleUrl: './side-navigation.css',
})
export class SideNavigation {
    activeTab = signal<'dashboard' | 'items' | 'sessions'>('dashboard');
}
