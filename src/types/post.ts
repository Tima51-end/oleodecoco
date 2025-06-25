export interface IArticle {
  id: number;
  title: string;
  summary: string;
  content: string;
  image?: string;
  reading_time?: string;
  published_date?: string;
  author: string;
  avatar?: string;
  type?: string;
  comments?: IComment[];
}

export interface IComment {
  name: string;
  text: string;
  date: string;
}