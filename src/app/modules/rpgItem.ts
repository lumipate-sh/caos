class RPG_Item {
  title: string;
  authors: string[]; // optional. can be a folk game, anonymous author...
  itemType: 'Core Rules' | 'Module' | 'Accessory';
  tags: string[]; // main tag at index 0?? | should point to a enum of tags to be created later
  owned: boolean;
  datesPlayed: Date[];
  score: number;


  constructor(
    title: string,
    authors?: string[],
    itemType: string,
    tags?: string[],
    owned: boolean,
    datesPlayed?: Date[],
    score?: number) {
    this.title = title;
    if (this.authors === undefined) {
      this.authors = [];
    }

    this.authors = authors
    this.itemType = itemType;
  }



}
