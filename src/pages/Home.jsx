import PostCard from "../components/PostCard";
const posts = [
  {
    id: 1,
    title: "Understanding REST APIs",
    excerpt: "A look at how REST APIs actually work.",
    author: "Tarun",
    date: "Aug 10, 2026",
    readTime: 5
  },
  {
    id: 2,
    title: "Learning React",
    excerpt: "Things I've learned while building my first React application.",
    author: "Tarun",
    date: "Aug 8, 2026",
    readTime: 4
  },
  {
    id: 3,
    title: "Why I Like Backend Development",
    excerpt: "Some thoughts on building APIs and working with databases.",
    author: "Tarun",
    date: "Aug 5, 2026",
    readTime: 6
  }
];

function Home(){
    return (
        <>
        <main>
            <section className="hero">
                <h1>Thoughts worth writing down.</h1>
                <p>
                    a collection of ideas, stories, and things worth remembering.
                </p>
            </section>

            <section className="posts">
                <h2>Latest</h2>
                {posts.map(post => (
                    <PostCard key={post.id} post={post}></PostCard>
                ))}
            </section>


        </main>
        </>
    );
}

export default Home;