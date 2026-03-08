// import { isValidURL } from "./dataValid";
//for now completely useless


export class Author {
    id: number;
    name: string;
    website?: string;
    notes?: string;

    constructor(id: number, name: string, website?: string, notes?: string) {
        this.id = id;
        this.name = name;
        website === undefined ? this.website = '' : this.website = website;
        notes === undefined ? this.notes = '' : this.notes = notes;
    }
}
