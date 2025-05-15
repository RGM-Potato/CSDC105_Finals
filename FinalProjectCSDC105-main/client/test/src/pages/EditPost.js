import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";

export default function EditPost() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [file, setFiles] = useState(null);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch('http://localhost:4000/post/' + id, {
            credentials: 'include',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch post. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(postInfo => {
            setTitle(postInfo.title);
            setContent(postInfo.content);
            setSummary(postInfo.summary);
        })
        .catch(error => {
            console.error('Error loading post:', error);
        });
    }, [id]);
    

    async function updatePost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('id', id);
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        if (file && file.length > 0) {
            data.set('file', file[0]);
        }
    
        const response = await fetch('http://localhost:4000/post', {
            method: 'PUT',
            body: data,
            credentials: 'include',
        });
    
        if (response.ok) {
            setRedirect(true);
        }
    }
    

    if (redirect) {
        return <Navigate to={'/post/' + id} />
    }

    return (
        <div className="post-page-container">
            <form className="create-post" onSubmit={updatePost}>
                <h1>Edit Post</h1>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={ev => setTitle(ev.target.value)}
                />
                <input
                    type="text"
                    placeholder="Summary"
                    value={summary}
                    onChange={ev => setSummary(ev.target.value)}
                />
                <div className="file-input-container">
                    <input
                        type="file"
                        onChange={ev => setFiles(ev.target.files)}
                    />
                </div>

                <div style={{ background: 'white', borderRadius: '6px', margin: '20px 0' }}>
                    <Editor onChange={setContent} value={content} />
                </div>

                <button style={{ marginTop: "20px" }}>Update post</button>
            </form>
        </div>
    );
}