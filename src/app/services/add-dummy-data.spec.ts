import { TestBed } from '@angular/core/testing';

import { AddDummyData } from './add-dummy-data';

describe('AddDummyData', () => {
    let service: AddDummyData;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AddDummyData);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
