import { TestBed } from '@angular/core/testing';

import { RpgSessionService } from './rpg-session-service';

describe('RpgSessionService', () => {
    let service: RpgSessionService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(RpgSessionService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
