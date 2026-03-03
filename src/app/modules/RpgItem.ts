// import { }

class RPG_Item {
    id: number;
    title: string;
    authors?: string[]; // optional. can be a folk game, anonymous author...
    itemType: 'core' | 'module' | 'accessory';
    itemTags?: string[]; // main tag at index 0?? | should point to a enum of tags to be created later
    owned: boolean;
    wished: boolean;
    datesPlayed: Date[];
    score: number;


    constructor(
        id: number, // gets passed alongside user input data. is calculated from last id given
        title: string,
        itemType: 'core' | 'module' | 'accessory',
        owned: boolean,
        wished: boolean,
        authors?: string[],
        itemTags?: string[],
        datesPlayed?: Date[],
        score?: number
    ) {
        this.id = id;
        this.title = title;
        this.itemType = itemType;
        this.owned = owned;
        this.wished = wished;
        authors === undefined ? this.authors = [] : this.authors = authors;
        datesPlayed === undefined ? this.datesPlayed = [] : this.datesPlayed = datesPlayed;
        itemTags === undefined ? this.itemTags = [] : this.itemTags = itemTags;
        score === undefined ? this.score = 0 : this.score = score;
        authors === undefined ? this.authors = [] : this.authors = authors;
    }
}





