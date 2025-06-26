import type { IComment } from "../types/post";

type Props = { comments: IComment[] };

export function CommentsList({ comments }: Props) {
  if (comments.length === 0)
    return <p className="py-4 text-gray-500">There are no comments yet.</p>;

  return (
    <ul className="mt-4 space-y-6">
      {comments.map((c, i) => (
        <li key={i} className="border-b pb-4">
          <p className="font-medium text-lg">
            {c.name}{" "}
            <span className="text-sm text-gray-500">
              {new Date(c.date).toLocaleString()}
            </span>
          </p>
          <p className="mt-2 leading-relaxed">{c.text}</p>
        </li>
      ))}
    </ul>
  );
}
