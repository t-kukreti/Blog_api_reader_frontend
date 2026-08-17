import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";

function ReaderViewPost() {
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function getPost() {
      try {
        const response = await fetch(
          `http://localhost:8000/posts/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          console.log(data.message);
          return;
        }

        setPost(data.post);
      } catch (err) {
        console.log(err);
      }
    }

    getPost();
  }, [id]);

  useEffect(() => {
    async function getComments() {
      try {
        const response = await fetch(
          `http://localhost:8000/posts/${id}/comments`
        );

        const data = await response.json();

        if (!response.ok) {
          console.log(data.message);
          return;
        }

        setComments(data);
      } catch (err) {
        console.log(err);
      }
    }

    getComments();
  }, [id]);

  if (!post) {
    return (
      <>
        <p>Loading ...</p>
        <Link to="/" className="back-link">
          ← Back to latest
        </Link>
      </>
    );

  }

  return (
    <main className="reader-view">
      <Link to="/" className="back-link">
        ← Back to latest
      </Link>

      <article>
        <p className="reader-post-status">
          Published
        </p>

        <h1>{post.title}</h1>

        <div className="reader-post-content">
          {post.content}
        </div>
      </article>
      <CommentForm
        postId={post.id}
        onCommentCreated={(comment) => {
          setComments((currentComments) => [
            ...currentComments,
            comment,
          ]);
        }}
      />

      <CommentList
        comments={comments}
        postId={post.id}
        onCommentDeleted={(id) => {
          setComments((currentComments) =>
            currentComments.filter((comment) => comment.id !== id)
          );
        }}
        onCommentUpdated={(updatedComment) => {
          setComments((currentComments) =>
            currentComments.map((comment) =>
              comment.id === updatedComment.id
                ? {
                  ...comment,
                  content: updatedComment.content,
                  updatedAt: updatedComment.updatedAt
                }
                : comment
            )
          );
        }}
      />
    </main>
  );
}

export default ReaderViewPost;