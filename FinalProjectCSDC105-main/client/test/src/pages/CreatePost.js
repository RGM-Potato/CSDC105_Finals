import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [file,setFiles] = useState('');
    const [redirect,setRedirect] = useState(false);
    
    async function createNewPost(ev){
        const data = new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        if (file && file.length > 0) {
            data.set('file', file[0]);
        }
        
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/post', {
            method:'POST',
            body: data,
            credentials:'include',
        });
        if (response.ok){
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }
        
    return (
        <div className="post-page-container">
            <form className="create-post" onSubmit={createNewPost}>
                <h1>Create New Post</h1>
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
                    <input type="file"
                        onChange={ev => setFiles(ev.target.files)} 
                    />
                </div>

                <div style={{ background: 'white', borderRadius: '6px', margin: '20px 0' }}>
                    <ReactQuill 
                        value={content} 
                        onChange={setContent}
                        modules={{
                            toolbar: [
                                [{ 'header': [1, 2, false] }],
                                ['bold', 'italic', 'underline','strike', 'blockquote'],
                                [{'list': 'ordered'}, {'list': 'bullet'}],
                                ['link', 'image'],
                                ['clean']
                            ]
                        }}
                        style={{ background: 'white' }}
                    />
                </div>
                <button style={{ marginTop: "20px" }}>Create post</button>
            </form>
        </div>
    );
}