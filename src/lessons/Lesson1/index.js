import keyDrillText from './keydrill.txt?raw';
import wordDrillText from './worddrill.txt?raw';
import sentenceDrillText from './sentencedrill.txt?raw';
import paraDrillText from './paradrill.txt?raw';

export const Lesson1 = {
  id: 1,
  title: 'Lesson 1: Home Row',
  keys: 'ASDF JKL;',
  description: 'Master the foundational home row anchors, home finger resting keys, and core rhythm.',
  badge: 'Foundation',
  keyDrill: keyDrillText,
  wordDrills: [{ name: 'Word Drill 1', text: wordDrillText }],
  sentenceDrills: [{ name: 'Sentence Drill 1', text: sentenceDrillText }],
  paragraphDrills: [{ name: 'Paragraph Drill 1', text: paraDrillText }],
  paragraphDrill: [{ name: 'Paragraph Drill 1', text: paraDrillText }],
};

export default Lesson1;
