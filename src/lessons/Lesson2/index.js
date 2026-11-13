import keyDrillText from './keydrill.txt?raw';
import wordDrillText from './worddrill.txt?raw';
import sentenceDrillText from './sentencedrill.txt?raw';
import paraDrillText from './paradrill.txt?raw';

export const Lesson2 = {
  id: 2,
  title: 'Lesson 2: Top Row E & I',
  keys: 'E & I Keys',
  description: 'Reach upwards from home row with index and middle fingers.',
  badge: 'Level 2',
  keyDrill: keyDrillText,
  wordDrills: [{ name: 'Word Drill 1', text: wordDrillText }],
  sentenceDrills: [{ name: 'Sentence Drill 1', text: sentenceDrillText }],
  paragraphDrills: [{ name: 'Paragraph Drill 1', text: paraDrillText }],
  paragraphDrill: [{ name: 'Paragraph Drill 1', text: paraDrillText }],
};

export default Lesson2;
