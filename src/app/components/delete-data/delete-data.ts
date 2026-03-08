import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LocalStorageUtils } from '../../services/local-storage-utils';

@Component({
    selector: 'app-delete-data',
    imports: [MatButtonModule, MatIconModule],
    templateUrl: './delete-data.html',
    styleUrl: './delete-data.css',
})
export class DeleteData {
    private localStorageUtils = inject(LocalStorageUtils);

    deleteAllData(): void {
        if (confirm('Are you sure you want to delete ALL data? This cannot be undone!')) {
            this.localStorageUtils.deleteAllData();
            window.location.reload();
        }
    }
}
