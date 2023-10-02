import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { deleteSinglePost, getSinglePost } from '../api/postData';
import PostForm from './forms/PostForm';
import { getAllreactions } from '../api/reactionData';
import ReactionCard from './reactionCard';

function PostCard({ postObj }) {
  const router = useRouter();
  const [singlePost, setSinglePost] = useState();
  const [reactObj, setReactObj] = useState([]);

  const getReactions = () => {
    getAllreactions().then(setReactObj);
  };

  useEffect(() => {
    getSinglePost(postObj?.id).then((data) => setSinglePost(data));
    getReactions();
  }, [postObj]);

  const deletePost = () => {
    if (window.confirm('Delete this Post?')) {
      deleteSinglePost(singlePost?.post?.id).then(() => router.push('/posts'));
    }
  };

  const viewPostDetails = () => {
    // console.log('Navigating to post details for post ID:', singlePost?.post?.id);
    router.push(`/${singlePost?.id}`);
  };

  // console.log('this is the post obj:', postObj);
  // console.log('this is the single post:', singlePost);

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Title>{singlePost?.category?.label}</Card.Title>
      <Card.Title>{singlePost?.title}</Card.Title>
      <Card.Text>{singlePost?.content}</Card.Text>
      <Card.Text>
        <strong>Tags:</strong> {singlePost?.tags?.[0]?.label}
      </Card.Text>
      <Button variant="primary" onClick={viewPostDetails}>
        View Details
      </Button>
      <div className="Reactions">
        {reactObj?.map((rObj) => (
          <ReactionCard key={rObj.id} Obj={rObj} postObj={postObj} />
        ))}
      </div>
      <Button variant="primary">button2</Button>
      <Button variant="danger" onClick={deletePost}>
        Delete
      </Button>
      <PostForm postObj={singlePost} />
    </Card>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    postUserId: PropTypes.number,
    Content: PropTypes.string,
    productPrice: PropTypes.number,
    id: PropTypes.number,
  }).isRequired,
};

export default PostCard;
