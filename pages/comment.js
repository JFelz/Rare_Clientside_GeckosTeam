import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getAllComments } from '../api/commentData';
import CommentCard from '../components/CommentCard';

function CommentPage() {
  const [comments, setComments] = useState([]);

  const getComments = () => {
    getAllComments().then(setComments);
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '22vh',
          padding: '7px',
          maxWidth: '100px',
          margin: '0 auto',
        }}
      >
        <h1>All Comments</h1>
        <Link href="/newComment" passHref>
          <Button> Add A Comment</Button>
        </Link>

      </div>
      <div className="d-flex justify-content-between">
        {comments?.map((comment) => (
          <CommentCard commentObj={comment} />))}
      </div>
    </>
  );
}

export default CommentPage;
