import { Component, inject, OnInit } from '@angular/core';
import { AddDummyData } from '../../services/add-dummy-data';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { LocalStorageUtils } from '../../services/local-storage-utils';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AddRpgItemModal } from '../add-rpg-item-modal/add-rpg-item-modal';
import { AddRpgSession } from '../add-rpg-session/add-rpg-session';

@Component({
    selector: 'app-header',
    imports: [MatButtonModule, MatToolbarModule, MatIconModule, MatDialogModule],
    templateUrl: './header.html',
    styleUrl: './header.css',
})
export class Header implements OnInit {
    protected title: string = 'Chaotic Archive of Oddities and Sagas';
    protected shortTitle: string = 'CAOS';
    protected logo: string = 'img/caos-logo.svg';
    protected logoAltText: string =
        'CAOS logo featuring a minimalist illustration of a book with an odd looking inscription on the cover';
    protected dashboardLabel: string = 'ponder the orb';
    protected rpgItemListLabel: string = 'browse the archives';

    // inject services
    protected mem = inject(LocalStorageUtils);

    private dummy = inject(AddDummyData);
    readonly dialog = inject(MatDialog);

    // behaviour for demo mode
    protected onDemoModeClick(): void {
        console.log('demo mode button clicked');
        this.dummy.activateDemoMode();
    }

    protected onRecordSessionClick(): void {
        console.log('record new session button clicked');
        this.dialog.open(AddRpgSession);
    }

    protected onAddRpgItemClick(): void {
        console.log('add rpg item button clicked');
        const addRpgItemModal = this.dialog.open(AddRpgItemModal);
    }

    ngOnInit() {
        console.log('...using ngOnInit on Header');
    }
}
