function PostCard({ post }){
    return(
        <article className="post-card">
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>

            <div className="post-meta">
                <span>{post.author}</span>
                <span>.</span>
                <span>{post.date}</span>
                <span>.</span>
                <span>{post.readTime} min read</span>
            </div>
        </article>
    );

}

export default PostCard;