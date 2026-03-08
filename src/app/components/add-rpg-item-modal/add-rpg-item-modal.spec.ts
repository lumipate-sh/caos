import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRpgItemModal } from './add-rpg-item-modal';

describe('AddRpgItemModal', () => {
    let component: AddRpgItemModal;
    let fixture: ComponentFixture<AddRpgItemModal>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AddRpgItemModal],
        }).compileComponents();

        fixture = TestBed.createComponent(AddRpgItemModal);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
