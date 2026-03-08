import { Component, inject, ChangeDetectionStrategy, computed } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RpgSessionService } from '../../services/rpg-session-service';
import { RpgItemService } from '../../services/rpg-item-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import type { RpgSession } from '../../schema/rpg-session';

export interface AddRpgSessionModalData {
    session?: RpgSession;
}

@Component({
    selector: 'app-add-rpg-session',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatDialogModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    templateUrl: './add-rpg-session.html',
    styleUrl: './add-rpg-session.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddRpgSession {
    private sessionService = inject(RpgSessionService);
    private rpgItemService = inject(RpgItemService);
    private dialogRef = inject(MatDialogRef<AddRpgSession>);
    private data = inject<AddRpgSessionModalData>(MAT_DIALOG_DATA);

    isEditMode = !!this.data?.session;
    editingSession = this.data?.session;

    rpgItems = computed(() =>
        this.rpgItemService.listSignal().filter((item) => item.metadata.active),
    );

    newSessionForm: FormGroup;

    constructor() {
        const session = this.editingSession;

        this.newSessionForm = new FormGroup({
            sessionDate: new FormControl<Date | null>(
                session?.sessionDate ? new Date(session.sessionDate) : null,
            ),
            gameId: new FormControl<number | null>(session?.gameId || null),
            sessionNotes: new FormControl(session?.sessionNotes || ''),
        });
    }

    getGameTitle(gameId: number): string {
        const item = this.rpgItems().find((i) => i.metadata.id === gameId);
        return item ? item.title : '';
    }

    onSubmit(): void {
        const formValue = this.newSessionForm.value;

        const sessionData = {
            sessionDate: formValue.sessionDate || new Date(),
            gameId: formValue.gameId || 0,
            sessionNotes: formValue.sessionNotes || '',
        };

        if (this.isEditMode && this.editingSession) {
            this.sessionService.updateSession(this.editingSession.metadata.id, sessionData);
        } else {
            this.sessionService.addSession(sessionData);
        }

        this.dialogRef.close(true);
    }
}
