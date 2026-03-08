import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRpgSession } from './add-rpg-session';

describe('AddRpgSession', () => {
    let component: AddRpgSession;
    let fixture: ComponentFixture<AddRpgSession>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AddRpgSession],
        }).compileComponents();

        fixture = TestBed.createComponent(AddRpgSession);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
