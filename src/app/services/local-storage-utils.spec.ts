import { TestBed } from '@angular/core/testing';

import { LocalStorageUtils } from './local-storage-utils';

describe('LocalStorageUtils', () => {
    let service: LocalStorageUtils;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LocalStorageUtils);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
