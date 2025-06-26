import type { IArticle } from "../types/post";


export type Database = {
  public: {
    Tables: {
      ashley_articles: {
        Row: IArticle;
        Insert: Omit<IArticle, "id" | "published_date">;  
        Update: Partial<Omit<IArticle, "id" | "published_date">>;
      };
    };

  };
};
