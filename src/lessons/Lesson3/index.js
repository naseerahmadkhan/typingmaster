import keyDrillText from './keydrill.txt?raw';
import wordDrillText from './worddrill.txt?raw';
import sentenceDrillText from './sentencedrill.txt?raw';
import paraDrillText from './paradrill.txt?raw';

export const Lesson3 = {
  id: 3,
  title: 'Lesson 3: Top Row R & U',
  keys: 'R & U Keys',
  description: 'Reach upward with index fingers to develop spatial accuracy on the upper deck.',
  badge: 'Level 3',
  keyDrill: keyDrillText,
  wordDrills: [{ name: 'Word Drill 1', text: wordDrillText }],
  sentenceDrills: [{ name: 'Sentence Drill 1', text: sentenceDrillText }],
  paragraphDrills: [{ name: 'Paragraph Drill 1', text: paraDrillText }],
  paragraphDrill: [{ name: 'Paragraph Drill 1', text: paraDrillText }],
};

export default Lesson3;
