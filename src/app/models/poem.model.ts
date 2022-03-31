export interface Poem {
  id: number;
  title: string;
  author: string;
  lines: string[];
  linecount: number;
  bookmarked?: boolean;
}
