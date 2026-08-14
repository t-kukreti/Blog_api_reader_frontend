import { useEffect, useState } from "react";
import ReaderPostCard from "../components/ReaderPostCard";



function Home(){
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        async function getPosts(){
            try{

                const response = await fetch('http://localhost:8000/posts');
                const data = await response.json();

                if(!response.ok){
                    console.log(data.message);
                    return;
                }

                setPosts(data);

            }catch(err){
                console.log(err);
            }
        }
        getPosts();
    }, []);
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
                {posts.length === 0 ? (
                    <p>No posts published yet.</p>
                ): (
                    posts.map(post => (
                       <ReaderPostCard key={post.id} post={post}/>
                    ))
                )}
            </section>


        </main>
        </>
    );
}

export default Home;