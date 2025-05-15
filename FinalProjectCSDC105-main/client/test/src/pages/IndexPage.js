import { useEffect, useState } from "react";
import Post from "../Post";

export default function IndexPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/post')
            .then(response => response.json())
            .then(posts => {
                console.log(posts);
                setPosts(posts);
            })
            .catch(err => console.error('Failed to fetch posts:', err));
    }, []);

    return (
        <div className="post-container">
            {posts.length > 0 && posts.map(post => (
                <Post key={post._id} {...post} />
            ))}
        </div>
    );
}
