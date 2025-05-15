import { formatISO9075 } from 'date-fns';
import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then(response => response.json())
      .then(data => setPostInfo(data))
      .catch(error => console.error('Error fetching post:', error));
  }, [id]);

  if (!postInfo) return null;

  return (
    <div className="post-page-container">
      <div className="post-page">
        <h1>{postInfo.title}</h1>
        <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
        <div className="author">by {postInfo.author?.username || 'Unknown Author'}</div>

        {userInfo?.id === postInfo.author?._id && (
          <div className="edit-row">
            <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                   strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 
                      2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8
                      .8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 
                      0L19.5 7.125" />
              </svg>
              Edit this post
            </Link>
          </div>
        )}

        <div className="image">
          <img src={`http://localhost:4000/${postInfo.cover}`} alt={postInfo.title} />
        </div>

        <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
      </div>
    </div>
  );
}
