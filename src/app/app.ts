import { Component, OnInit, inject, afterNextRender } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { MainContent } from './components/main-content/main-content';
import { ThemeToggle } from './components/theme-toggle/theme-toggle';
import { DeleteData } from './components/delete-data/delete-data';
import { LocalStorageUtils } from './services/local-storage-utils';
import { RpgItemData } from './schema/rpg-item';
import { RpgSessionData } from './schema/rpg-session';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, Header, MainContent, ThemeToggle, DeleteData],
    templateUrl: './app.html',
    styleUrl: './app.css',
})
export class App implements OnInit {
    title: string = 'CAOS';
    fullTitle: string = 'Chaotic Archive of Oddities and Sagas';
    protected mem = inject(LocalStorageUtils);

    ngOnInit(): void {
        console.log('...using OnInit of App');
    }

    constructor() {
        afterNextRender(() => {
            this.initializeIfNeeded();
        });
    }

    private initializeIfNeeded(): void {
        console.log('...checking memory initialization');

        console.log('localstorage is empty: ', this.mem.isEmpty());

        const usageData = this.mem.loadFromMem('usageData');
        const hasUserData = usageData[0];

        if (this.mem.isEmpty() || !hasUserData) {
            console.log('-> Memory is empty, setting up...');
            this.memorySetup();
        } else {
            console.log('-> Memory already has user data, skipping setup');
        }
    }

    memorySetup(): void {
        console.log('...using memorySetup');

        const firstUseDate: Date = new Date(Date.now());

        const USAGE_DATA_SETUP = {
            firstUseDate: firstUseDate,
        };
        this.mem.storeInMem('usageData', USAGE_DATA_SETUP);

        const RPG_ITEM_DATA_SETUP: RpgItemData = {
            metadata: {
                lastIdAdded: 0,
                nrItemsDeleted: 0,
            },
            list: [],
            tags: [],
        };
        this.mem.storeInMem('rpgItemData', RPG_ITEM_DATA_SETUP);

        const RPG_SESSION_DATA_SETUP: RpgSessionData = {
            metadata: {
                lastIdAdded: 0,
                nrItemsDeleted: 0,
            },
            list: [],
        };

        this.mem.storeInMem('rpgSessionData', RPG_SESSION_DATA_SETUP);

        return;
    }
}
