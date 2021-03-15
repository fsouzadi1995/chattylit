import { Colors } from './colors.enum';
import { Emoji } from './emoji.enum';

/* eslint-disable @typescript-eslint/naming-convention */
export interface User {
  name: string;
  color: Colors;
  emoji: Emoji;
}
