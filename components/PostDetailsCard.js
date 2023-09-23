import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';
import { getSinglePost } from '../api/postData';

const PostDetailsCard = ({ postId }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (postId) {
      getSinglePost(postId).then((data) => {
        setPost(data);
      });
    }
  }, [postId]);

  if (!post) {
    return <p>Loading post details...</p>;
  }

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Title>{post?.category.label}</Card.Title>
      <Card.Title>{post?.title}</Card.Title>
      <Card.Text>{post?.content}</Card.Text>
      <Image src={post?.imageUrl} />
    </Card>
  );
};

PostDetailsCard.propTypes = {
  postId: PropTypes.number.isRequired,
};

export default PostDetailsCard;
