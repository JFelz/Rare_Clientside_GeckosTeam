import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { deleteSinglePost, getSinglePost } from '../api/postData';
import PostForm from './forms/PostForm';

function PostCard({ postObj }) {
  // const { user } = useAuth();
  const router = useRouter();
  const [singlePost, setSinglePost] = useState();

  useEffect(() => {
    getSinglePost(postObj?.id).then((data) => setSinglePost(data));
  }, [postObj]);

  const deletePost = () => {
    if (window.confirm('Delete this Post?')) {
      deleteSinglePost(singlePost.id).then(() => router.push('/posts'));
    }
  };

  console.log('this is the post obj:', postObj);
  console.log('this is the single post:', singlePost);
  return (

    <Card style={{ width: '18rem' }}>

      <Card.Title>{singlePost?.category.label}</Card.Title>
      <Card.Title>{singlePost?.title}</Card.Title>
      <Card.Text>
        {singlePost?.content}
      </Card.Text>
      <Button variant="primary">button1</Button>
      <Button variant="primary">button2</Button>
      <Button variant="danger" onClick={deletePost}>Delete</Button>
      <div>
        <Button src="../Images/Like.png" className="Button1" />
        <Button className="Button2">:(</Button>

      </div>
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
