import keyDrillText from './keydrill.txt?raw';
import wordDrillText from './worddrill.txt?raw';
import { paragraphDrills } from './paragraphDrills';

export const Lesson1 = {
  id: 1,
  title: 'Lesson 1: Home Row',
  keys: 'ASDF JKL;',
  description: 'Master the foundational home row anchors, home finger resting keys, and core rhythm.',
  badge: 'Foundation',
  keyDrill: keyDrillText,
  wordDrills: [
    { name: 'Word Drill 1', text: wordDrillText },
  ],
  paragraphDrills,
};

export default Lesson1;
