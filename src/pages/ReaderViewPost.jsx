import { useEffect, useState } from "react";
import { Link, useParams  } from "react-router-dom";

function ReaderViewPost() {

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

  if (!post) {
    return(
        <>
        <p>No post Found</p>
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
    </main>
  );
}

export default ReaderViewPost;