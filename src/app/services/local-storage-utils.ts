import { Injectable } from '@angular/core';
import { MemType } from '../schema/mem-type';

@Injectable({
    providedIn: 'root',
})

export class LocalStorageUtils {


    public NOTHING_FOUND_MSG: string = 'Perception check failed: nothing found'

    // NOTE: when dealing with localStorage, all returns are an array of 2 items:
    // - the first element a boolean designating if the operation was successful
    // - the second is either a message (if failed it says the error, on success it confirms the operation) or the requested data on reads


    private get isBrowserClient(): boolean {
        return typeof localStorage !== 'undefined';
    }



    isEmpty(): boolean {

        if (!this.isBrowserClient) { return false }
        return localStorage.length === 0
    }

    deleteAllData(): MemType {
        if (!this.isBrowserClient) { return [false, 'isnt browser'] }
        localStorage.clear()
        return [true, 'local storage deleted']
    }


    storeInMem<dataType>(key: string, data: dataType): MemType {
        if (!this.isBrowserClient) { return [false, 'isnt browser'] }
        localStorage.setItem(key, JSON.stringify(data));
        return [true, 'operation successful']
    }

    loadFromMem(key: string): MemType {
        if (!this.isBrowserClient) { return [false, 'isnt browser'] }
        if (localStorage === undefined) { return [false, 'localStorage wasnt loaded'] }
        const retrieved = localStorage.getItem(key);
        if (retrieved === null) { return [false, this.NOTHING_FOUND_MSG] }
        const parsed = JSON.parse(retrieved)
        return [true, parsed]

    }

    // prob wont be used
    pushToListInMem<dataType>(key: string, data: dataType): MemType {
        if (!this.isBrowserClient) { return [false, 'isnt browser'] };
        if (!this.loadFromMem(key)) { return [false, 'list not found'] }

        const list: unknown = this.loadFromMem(key);

        if (!Array.isArray(list)) { return [false, `${key} isn't a list`] }

        list.push(data);

        const keyInMem = key.split('.')[0]

        this.storeInMem(keyInMem, list)
        return [true, `operation successful. new list: ${list}`]

    }

    // prob wont be used
    readRecentFromListInMem<dataType>(key: string, qty: number): [boolean, dataType[] | string] {
        if (!this.isBrowserClient) { return [false, 'isnt browser'] }
        const retrieved: [boolean, unknown] = this.loadFromMem(key);
        const isFound: boolean = retrieved[0] as boolean;


        if (!isFound) {
            return [false, 'nothing found here']
        }
        const contentRetrieved = retrieved[1];

        if (!Array.isArray(contentRetrieved)) { return [false, 'isnt an array']; }

        const startIndex = contentRetrieved.length - qty;
        return [true, contentRetrieved.slice(startIndex)];
    }






    deleteItemFromMem(key: string): [boolean, string] {
        if (!this.isBrowserClient) { return [false, 'isnt browser'] }
        if (!this.loadFromMem(key)[0]) { return [false, 'item didnt exist to begin with'] }
        localStorage.removeItem(key)
        return [true, 'item deleted']
    }
}
