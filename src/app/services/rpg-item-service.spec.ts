import { TestBed } from '@angular/core/testing';

import { RpgItemService } from './rpg-item-service';

describe('RpgItemService', () => {
    let service: RpgItemService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(RpgItemService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
