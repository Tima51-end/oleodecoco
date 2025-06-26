import { useState } from "react";
import { commentsService } from "../services/comments.service";
import type { IComment } from "../types/post";

type Props = { articleId: number; onNew: (c: IComment) => void };

export function CommentForm({ articleId, onNew }: Props) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
   
      const { data, error } = await commentsService.addComment(articleId, { name, text });
      if (error || !data) {
        throw new Error(error?.message || 'Unknown error');
      }
      onNew(data);
      setName("");
      setText("");
    } catch (err) {
      console.error(err);
      alert("Не удалось отправить комментарий");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border-t pt-6">
      <h3 className="text-2xl font-semibold">New comment</h3>
      <div>
        <label className="block mb-1">Name</label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
      </div>
      <div>
        <label className="block mb-1">Comment</label>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          required
          rows={4}
          className="w-full border rounded p-2"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {submitting ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
