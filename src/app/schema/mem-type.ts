import { RpgItemData } from './rpg-item';
import { RpgSessionData } from './rpg-session';
import { UsageData } from './usage-data';

export type MemType = [boolean, RpgItemData | RpgSessionData | UsageData | string | unknown];
