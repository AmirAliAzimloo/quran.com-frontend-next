import AudioResponse from './AudioResponse';
import Tafsir from './Tafsir';
import Translation from './Translation';
import Word from './Word';

interface Verse {
  id: number;
  verseNumber: number;
  chapterId?: number | string;
  pageNumber: number;
  juzNumber: number;
  hizbNumber: number;
  rubNumber: number; //FIXME: This doesn't work, in browser console it's logging as RubElHizbNumber not RubNumber
  rubElHizbNumber: number; // Add this one instead
  verseKey: string;
  verseIndex: number;
  words: Word[];
  textUthmani?: string;
  textUthmaniSimple?: string;
  textUthmaniTajweed?: string;
  textImlaei?: string;
  textImlaeiSimple?: string;
  textIndopak?: string;
  sajdahNumber: null;
  sajdahType: null;
  imageUrl?: string;
  imageWidth?: number;
  v1Page?: number;
  v2Page?: number;
  codeV1?: string;
  codeV2?: string;
  translations?: Translation[];
  tafsirs?: Tafsir[];
  audio?: AudioResponse;
  timestamps?: {
    verseKey: string;
    timestampFrom: number;
    timestampTo: number;
    duration: number;
    segments: [number[]];
  };
}

export default Verse;
