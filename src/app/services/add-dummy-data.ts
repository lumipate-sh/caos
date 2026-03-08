import { Injectable, inject } from '@angular/core';
import { RpgItem, RpgItemData } from "../schema/rpg-item";
import { RpgSession, RpgSessionData } from '../schema/rpg-session';
import { LocalStorageUtils } from '../services/local-storage-utils';


@Injectable({
    providedIn: 'root',
})
export class AddDummyData {

    mem = inject(LocalStorageUtils)

    // DUMMY_RPG_ITEM_METADATA:

    DUMMY_RPG_ITEM_LIST: RpgItem[] = [
        {

            metadata: { id: 1, dateAdded: new Date("2024-01-01"), datesUpdated: [], active: true },
            title: "Player's Handbook (Dungeons & Dragons 5th Edition)",
            description: "Core rules and Player character creation for the 5th edition of D&D",
            authors: ["Jeremy Crawford", "Mike Mearls"],
            itemType: "core",
            itemTags: ["fantasy", "traditional", "tactical", "d20"],
            yearReleased: 2014,
            isOwned: false,
            onWishList: false,
            userRating: 12,
            website: "https://dnd.wizards.com",
            notes: "A bit too crunchy for me."
        },
        {
            metadata: { id: 2, dateAdded: new Date("2024-01-02"), datesUpdated: [], active: true },
            title: "Dungeon's Master Guide (Dungeons & Dragons 5th Edition)",
            description: "Game Master additional tips and rules, and toolbox for creating adventures and worlds, and list of random tables",
            authors: ["Jeremy Crawford", "Mike Mearls"],
            itemType: "core",
            itemTags: ["fantasy", "traditional", "tactical", "d20"],
            yearReleased: 2014,
            isOwned: true,
            onWishList: false,
            userRating: 8,
            website: "https://dnd.wizards.com",
            notes: "Famously bad for new players and GMs"
        },
        {
            metadata: { id: 3, dateAdded: new Date("2024-01-03"), datesUpdated: [], active: true },
            title: "MÖRK BORG",
            description: "A DOOM METAL ALBUM OF A GAME. Rules light. Art heavy. MÖRK BORG is blackened artpunk/osr about ill-fated bastards seeking redemption, forgiveness or just the last remaining riches of a world that is plunging ever faster to its inevitable ruin. An art book you can play. A spiked flail to the face.",
            authors: ["Pelle Nilsson", "Johan Nohr"],
            itemType: "core",
            itemTags: ["fantasy", "traditional", "borg", "d20"],
            yearReleased: 2019,
            isOwned: true,
            onWishList: false,
            userRating: 17,
            website: "https://morkborg.com/",
            notes: "The first of the amazing borg rpg movement and design philosophy"
        },
        {
            metadata: { id: 4, dateAdded: new Date("2024-01-07"), datesUpdated: [], active: true },
            title: "Blades in the Dark",
            description: "Blades in the Dark is a tabletop role-playing game about a gang of criminals seeking their fortunes on the haunted streets of Duskwall. There are heists, chases, occult mysteries, dangerous bargains, bloody skirmishes, and, above all, riches to be had if you're bold enough.",
            authors: ["John Harper"],
            itemType: "core",
            itemTags: ["heist", "traditional", "fantasy", "dice pool", "pbta", "fitd"],
            yearReleased: 2016,
            isOwned: false,
            onWishList: true,
            userRating: 0,
            website: "https://bladesinthedark.com",
            notes: "very interesting world, highly influential when it comes to design philosophy"
        },

        {
            metadata: { id: 5, dateAdded: new Date("2024-01-09"), datesUpdated: [], active: true },
            title: "Ironsworn",
            description: "In the Ironsworn tabletop roleplaying game, you are a hero sworn to undertake perilous quests in the dark fantasy setting of the Ironlands. You will explore untracked wilds, fight desperate battles, forge bonds with isolated communities, and reveal the secrets of this harsh land.",
            authors: ["Shawn Tomkin"],
            itemType: "core",
            itemTags: ["solo", "traditional", "gm-less", "fantasy"],
            yearReleased: 2018,
            isOwned: true,
            onWishList: false,
            userRating: 0,
            website: "https://tomkinpress.com/pages/ironsworn",
            notes: "very influential, want to try it out solo"
        },
        {
            metadata: { id: 6, dateAdded: new Date("2024-01-13"), datesUpdated: [], active: true },
            title: "Agent's Handbook (Delta Green)",
            description: "In DELTA GREEN: THE ROLE-PLAYING GAME, you are one of those agents. You’re the one they call when unnatural horrors seep into the world. You fight to keep cosmic evil from claiming human lives and sanity. You conspire to cover it all up so no one else must see what you’ve seen—or learn the terrible truths you’ve discovered. The AGENT'S HANDBOOK is a players-only rulebook for DELTA GREEN: THE ROLE-PLAYING GAME. odern-day investigative horror RPG fighting cosmic threats.",
            itemType: "core",
            itemTags: ["modern", "horror", "lovecraftian", "traditional"],
            yearReleased: 2016,
            isOwned: false,
            onWishList: false,
            userRating: 0,
            website: "https://www.delta-green.com"
        },
        {
            metadata: { id: 7, dateAdded: new Date("2024-01-17"), datesUpdated: [], active: true },
            title: "Vampire: The Masquerade 5th Edition Core Book",
            description: "Vampire: The Masquerade is the original and ultimate roleplaying game of personal and political horror. You are a vampire, struggling for survival, supremacy, and your own fading humanity—afraid of what you are capable of, and fearful of the inhuman conspiracies that surround you.",
            itemType: "core",
            itemTags: ["gothic", "traditional", "modern", "horror"],
            yearReleased: 2018,
            isOwned: false,
            onWishList: true,
            userRating: 0,
            website: "https://www.paradoxinteractive.com/games/world-of-darkness/discover-world-of-darkness/vampire-the-masquerade"
        },
    ]

    DUMMY_RPG_ITEM_TAG_LIST: string[] = ["traditional", "gm-less", "solo", 'fantasy', 'modern', 'horror', 'lovecraftian', 'pbta', 'fitd', 'd20', 'dice pool', 'gothic', 'heist', 'tactical', 'borg'];

    DUMMY_RPG_ITEM_DATA: RpgItemData = {
        metadata: {
            lastIdAdded: 7,
            nrItemsDeleted: 0

        },
        list: this.DUMMY_RPG_ITEM_LIST,
        tags: this.DUMMY_RPG_ITEM_TAG_LIST
    }

    DUMMY_SESSION_LIST: RpgSession[] = [
        {
            metadata: { id: 1, dateAdded: new Date("2026-01-01"), datesUpdated: [], active: true },
            sessionDate: new Date('2026-01-01'),
            gameId: 1,
            sessionNotes: "It was a good session."
        },
        {
            metadata: { id: 2, dateAdded: new Date(Date.now()), datesUpdated: [], active: true },
            sessionDate: new Date('2026-03-03'),
            gameId: 2,
            sessionNotes: "fun stuff."
        }
    ]

    DUMMY_RPG_SESSION_DATA: RpgSessionData = {
        metadata: { lastIdAdded: 2, nrItemsDeleted: 0 },
        list: this.DUMMY_SESSION_LIST
    }

    activateDemoMode(): void {
        console.log('...using activateDemoMode')
        this.mem.storeInMem('rpgItemData', this.DUMMY_RPG_ITEM_DATA);
        this.mem.storeInMem('rpgSessionData', this.DUMMY_RPG_SESSION_DATA);
    }

}
