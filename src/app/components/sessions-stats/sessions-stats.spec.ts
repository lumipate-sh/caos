import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionsStats } from './sessions-stats';

describe('SessionsStats', () => {
    let component: SessionsStats;
    let fixture: ComponentFixture<SessionsStats>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SessionsStats],
        }).compileComponents();

        fixture = TestBed.createComponent(SessionsStats);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
