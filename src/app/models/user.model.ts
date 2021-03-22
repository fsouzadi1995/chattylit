import { Colors } from './colors.enum';
import { Emoji } from './emoji.enum';

export interface User {
  name: string;
  color: Colors;
  emoji: Emoji;
}
