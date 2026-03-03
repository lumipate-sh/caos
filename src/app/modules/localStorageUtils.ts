// LOCAL STORAGE FUNCTIONS

export function deleteAllData() {
    localStorage.clear()
    return
}


export function storeInMem<dataType>(key: string, data: dataType): void {

    localStorage.setItem(key, JSON.stringify(data));
}

export function loadFromMem<dataType>(key: string, errMsg: string = 'nothing here yet...'): dataType | [string] {
    const retrieved: string | null = localStorage.getItem(key);
    if (retrieved === null) { return [errMsg] }
    const parsed = JSON.parse(retrieved)
    return parsed

}

export function pushToListInMem<dataType>(key: string, data: dataType): void {
    let list: dataType[] = loadFromMem(key) as dataType[];
    if (!Array.isArray(list)) {
        return
    }
    list.push(data);
    storeInMem(key, list)

}

export function readRecentFromListInMem<dataType>(key: string, qty: number): dataType[] {
    let list = loadFromMem(key);
    if (!list || !Array.isArray(list)) {
        return [];
    }
    const startIndex = list.length - qty;
    return list.slice(startIndex);
}


