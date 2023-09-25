import { Button } from 'react-bootstrap';
// import { useEffect, useState } from 'react';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
// import { getSubscribedPosts } from '../api/categoryData';
// import PostCard from '../components/PostCard';

function Home() {
  const { user } = useAuth();
  // const [subscribedPosts, setSubscribedPosts] = useState([]);

  // const getUserSubscribedPosts = () => {
  //   getSubscribedPosts(userId).then(setSubscribedPosts);
  // };

  // useEffect(() => {
  //   getUserSubscribedPosts(userId);
  // }, []);

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Hello {user.displayName}! </h1>
      <p>Your Bio: {user.bio}</p>
      <p>Click the button below to logout!</p>
      <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>

      {/* {subscribedPosts.map((post) => (
        <PostCard key={post.id} postObj={post} />
      ))} */}
    </div>
  );
}

export default Home;
