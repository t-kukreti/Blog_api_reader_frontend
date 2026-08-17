import CommentItem from "./CommentItem";

function CommentList( {comments, postId} ){
    return (
        <section className="comments">
            <h2>Comments</h2>
            {comments.length === 0 ? (
                <p>No comments yet. Be the first one to add a commment !</p>
            ) : (
                comments.map((comment) => (
                    <CommentItem key={comment.id} comment = {comment} postId={postId}/>
                ))
            )}
        </section>
    );
};


export default CommentList;