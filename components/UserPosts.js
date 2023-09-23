// eslint-disable-next-line react-hooks/exhaustive-deps
import { useEffect, useState } from 'react';
import { findUser, getAllposts } from '../api/postData';
import PostCard from './PostCard';
import { useAuth } from '../utils/context/authContext';

function UserPosts() {
  const [posts, setPosts] = useState([]);
  const [checkUser, setCheckUser] = useState();
  const { user } = useAuth();

  const getPosts = () => {
    getAllposts().then(setPosts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    findUser(user.uid).then((data) => setCheckUser(data));
  }, []);

  // console.log('these are posts:', posts);
  // console.log('checkuser for posts profile', checkUser);

  const userPosts = posts?.filter((index) => index?.userId === checkUser?.[0]?.id);
  // console.log('these are user posts', userPosts);

  return (

    <div className="d-flex justify-content-between">
      {userPosts?.map((post) => (
        <PostCard key={post.id} postObj={post} />))}
    </div>

  );
}

export default UserPosts;
