import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import PostDetailsCard from '../components/PostDetailsCard';
import CommentCard from '../components/CommentCard';
import { getPostsComments } from '../api/commentData';

function DetailsPage() {
  const router = useRouter();
  const [comments, setComments] = useState([]);
  const { id } = router.query;

  const postIdNumber = id ? parseInt(id, 10) : null;

  useEffect(() => {
    getPostsComments(id).then(setComments);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Post Details</h1>
      {postIdNumber ? <PostDetailsCard postId={postIdNumber} /> : <p>No post selected.</p>}
      <Link href="/newComment" passHref>
        <Button> Add A Comment</Button>
      </Link>
      <div className="CommentCardShow d-flex flex-wrap" style={{ marginTop: '20px' }}>
        {comments.map((comment) => (
          <CommentCard key={comment.postId} commentObj={comment} onUpdate={getPostsComments} />
        ))}
      </div>
    </div>
  );
}

export default DetailsPage;
