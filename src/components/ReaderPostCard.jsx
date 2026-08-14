import { Link } from "react-router-dom";

function ReaderPostCard({ post }) {
  return (
    <article className="reader-post-card">
      <Link to={`/posts/${post.id}`}>
        <h3>{post.title}</h3>

        <p>
          {post.content.length > 200
            ? post.content.slice(0, 200) + "..."
            : post.content}
        </p>

        <span>Read article →</span>
      </Link>
    </article>
  );
}

export default ReaderPostCard;