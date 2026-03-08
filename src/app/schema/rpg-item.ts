import type { ItemMetadata } from "./item-metadata"
import type { ListMetadata } from "./list-metadata";

export type RpgItem = {
    metadata: ItemMetadata;
    title: string;
    description?: string;
    authors?: string[]; // optional. can be a folk game, anonymous author... also later with the creation of author object this will be deprecated, and will point to authorIDs
    itemType: 'core' | 'module';
    itemTags: string[]; // main tag at index 0?? | should point to a enum of tags to be created later
    yearReleased?: number;
    isOwned: boolean;
    onWishList: boolean;
    userRating: number; // 1 to 20 | 0 means no score is given
    website?: string;
    notes?: string;
}

export type RpgItemData = {
    metadata: ListMetadata;
    list: RpgItem[];
    tags: string[];
}

// TODO: IN V2 -> in the future tags should be divided multiple categories: rules (roll over, under, dice, cards...), genre (fantasy, scifi...), play type (solo, traditional, gm-less...)
