import type { IArticle } from "../types/post";
import { supabase } from "../utils/supabaseClient";


class ArticlesService {
  async getAll(): Promise<IArticle[]> {
    const { data, error } = await supabase
      .from("ashley_articles")
      .select("*");     

    if (error) throw error;
    return data ?? [];
  }
}

export const articlesService = new ArticlesService();
