import { Component, signal, effect, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-theme-toggle',
    imports: [MatButtonModule, MatIconModule],
    templateUrl: './theme-toggle.html',
    styleUrl: './theme-toggle.css',
})
export class ThemeToggle implements OnInit {
    private document = inject(DOCUMENT);

    isDarkMode = signal(true);

    constructor() {
        effect(() => {
            const html = this.document.documentElement;
            if (this.isDarkMode()) {
                html.removeAttribute('data-theme');
            } else {
                html.setAttribute('data-theme', 'light');
            }
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('theme', this.isDarkMode() ? 'dark' : 'light');
            }
        });
    }

    ngOnInit(): void {
        if (typeof localStorage !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                this.isDarkMode.set(savedTheme === 'dark');
            }
        }
    }

    toggleTheme(): void {
        this.isDarkMode.update((value) => !value);
    }
}
