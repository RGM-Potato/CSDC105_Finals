import { useContext, useEffect, useCallback } from "react";
import { UserContext } from "./UserContext";
import { Link, useNavigate } from "react-router-dom";
import logo from './assets/BLOGLOGO1.png';

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  
  const fetchProfile = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:4000/profile', {
        credentials: 'include',
      });
      if (response.ok) {
        const userData = await response.json();
        setUserInfo(userData);
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  }, [setUserInfo]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const logout = useCallback(async () => {
    try {
      await fetch('http://localhost:4000/logout', {
        credentials: 'include',
        method: 'POST',
      });
      setUserInfo(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [setUserInfo, navigate]);

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        <img 
          src={logo} 
          alt="Gunpla Info Logo" 
        />
      </Link>
      <nav>
  {username ? (
    <>
      <Link to="/create">CREATE NEW POST</Link>
<Link to="#" onClick={(e) => { e.preventDefault(); logout(); }}>LOGOUT</Link>


    </>
  ) : (
    <>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </>
  )}
</nav>
    </header>
  );
}
