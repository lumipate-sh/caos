import type { ItemMetadata } from "./item-metadata"
import type { ListMetadata } from "./list-metadata";

export type RpgSession = {
    metadata: ItemMetadata;
    sessionDate: Date;
    gameId: number;
    sessionNotes: string;
}

export type RpgSessionData = {
    metadata: ListMetadata;
    list: RpgSession[];
}
