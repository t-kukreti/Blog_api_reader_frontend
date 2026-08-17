import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import CommentForm from "./CommentForm";

function CommentItem({ comment, postId }) {
    const { currentUser } = useContext(AuthContext);

    const [content, setContent] = useState(comment.content);
    const [isDeleted, setIsDeleted] = useState(comment.deleted);

    const [replies, setReplies] = useState([]);
    const [showReplies, setShowReplies] = useState(false);
    const [repliesLoaded, setRepliesLoaded] = useState(false);
    const [showReplyForm, setShowReplyForm] = useState(false);

    const [editing, setEditing] = useState(false);
    const [editContent, setEditContent] = useState(comment.content);

    const [updatedAt, setUpdatedAt] = useState(comment.updatedAt);

    async function handleViewReplies() {
        if (!repliesLoaded) {
            const response = await fetch(
                `http://localhost:8000/comments/${comment.id}/replies`
            );

            const data = await response.json();

            if (!response.ok) {
                console.log(data.message);
                return;
            }

            setReplies(data);
            setRepliesLoaded(true);
        }

        setShowReplies((current) => !current);
    }

    function startEditing() {
        setEditContent(content);
        setEditing(true);
    }

    function cancelEditing() {
        setEditContent(content);
        setEditing(false);
    }

    async function handleEdit() {
        const trimmedContent = editContent.trim();

        if (!trimmedContent) return;

        const token = localStorage.getItem("token");

        const response = await fetch(
            `http://localhost:8000/comments/${comment.id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    content: trimmedContent,
                }),
            }
        );

        if (response.status === 401) {
            alert("Please login again.");
            return;
        }

        const data = await response.json();

        if (!response.ok) {
            console.log(data.message);
            return;
        }

        setContent(data.updatedComment.content);
        setUpdatedAt(data.updatedComment.updatedAt);
        setEditing(false);
    }

    async function handleDelete() {
        const confirmed = window.confirm(
            "Are you sure you want to delete this comment?"
        );

        if (!confirmed) return;

        const token = localStorage.getItem("token");

        const response = await fetch(
            `http://localhost:8000/comments/${comment.id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.status === 401) {
            alert("Please login again.");
            return;
        }

        const data = await response.json();

        if (!response.ok) {
            console.log(data.message);
            return;
        }

        setIsDeleted(true);
        setEditing(false);
        setShowReplyForm(false);
    }

    return (
        <article className="comment">
            {editing ? (
                <>
                    <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                    />

                    <div className="comment-actions">
                        <button onClick={handleEdit}>Save</button>
                        <button onClick={cancelEditing}>Cancel</button>
                    </div>
                </>
            ) : (
                <>
                    <p>{isDeleted ? "[deleted]" : content}</p>

                    <small>
                        {new Date(comment.createdAt).toLocaleDateString()}

                        {updatedAt &&
                            new Date(updatedAt) > new Date(comment.createdAt) &&
                            " · Edited"}
                    </small>

                    <div className="comment-actions">
                        {currentUser?.id === comment.authorId && !isDeleted && (
                            <>
                                <button onClick={startEditing}>
                                    Edit
                                </button>

                                <button onClick={handleDelete}>
                                    Delete
                                </button>
                            </>
                        )}

                        {!isDeleted && (
                            <button
                                onClick={() =>
                                    setShowReplyForm((current) => !current)
                                }
                            >
                                Reply
                            </button>
                        )}

                        {comment.replyCount > 0 && (
                            <button onClick={handleViewReplies}>
                                {showReplies
                                    ? "Hide replies"
                                    : `View replies · ${comment.replyCount}`}
                            </button>
                        )}
                    </div>
                </>
            )}

            {showReplyForm && !isDeleted && (
                <CommentForm
                    postId={postId}
                    parentCommentId={comment.id}
                    onCommentCreated={(newReply) => {
                        setReplies((currentReplies) => [
                            ...currentReplies,
                            newReply,
                        ]);

                        setShowReplyForm(false);

                        if (!repliesLoaded) {
                            setRepliesLoaded(true);
                        }

                        setShowReplies(true);
                    }}
                />
            )}

            {showReplies && (
                <div className="comment-replies">
                    {replies.map((reply) => (
                        <CommentItem
                            key={reply.id}
                            comment={reply}
                            postId={postId}
                        />
                    ))}
                </div>
            )}
        </article>
    );
}

export default CommentItem;