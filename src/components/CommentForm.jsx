import { useState } from "react";

function CommentForm({ postId, parentCommentId = null, onCommentCreated }) {
    const [content, setContent] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        if (!content.trim()) return;

        const token = localStorage.getItem("token");

        const response = await fetch(
            `http://localhost:8000/posts/${postId}/comments`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    content,
                    parentCommentId,
                }),
            }
        );
        

        if (response.status === 401) {
            alert("Please login to comment");
            setContent("");
            return;
        }

        const data = await response.json();



        if (!response.ok) {
            console.log(data.message);
            return;
        }


        setContent("");

        onCommentCreated(data.postedComment);
    }

    return (
        <form className="comment-form" onSubmit={handleSubmit}>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your thoughts..."
            />
            <button type="submit">Comment</button>
        </form>
    );
}

export default CommentForm;