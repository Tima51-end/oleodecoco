import type { IComment } from "../types/post";
import { supabase } from "../utils/supabaseClient";
import { articlesService } from "./articles.service";
import type { PostgrestError } from "@supabase/supabase-js";

class CommentsService {
  async addComment(
    articleId: number,
    comment: Omit<IComment, "date">
  ): Promise<{ data: IComment | null; error: PostgrestError | null }> {
    const article = (await articlesService.getAll()).find(
      (a) => a.id === articleId
    );
    if (!article) {
      throw new Error("Статья не найдена");
    }

    const newComment: IComment = {
      ...comment,
      date: new Date().toISOString(),
    };

    const updatedComments = [...(article.comments ?? []), newComment];
    const { error } = await supabase
      .from("ashley_articles")
      .update({ comments: updatedComments })
      .eq("id", articleId);

    if (error) {
      return { data: null, error };
    }

    return { data: newComment, error: null };
  }
}

export const commentsService = new CommentsService();
