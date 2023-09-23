import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { deleteSingleComment } from '../api/commentData';
// import Link from 'next/link';
// import { useAuth } from '../utils/context/authContext';

function CommentCard({ commentObj }) {
  // const { user } = useAuth();
  // FOR DELETE, WE NEED TO REMOVE THE BOOK AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS
  const deleteThisComment = () => {
    if (window.confirm(`Delete ${commentObj.content}?`)) {
      deleteSingleComment(commentObj.id).then(() => console.log(commentObj));
    }
  };

  return (
    <Card style={{ width: '18rem' }}>

      <Card.Text>
        {commentObj?.content}
      </Card.Text>
      <Button variant="outline-secondary" className="m-2" style={{ height: '100%' }}> Edit Comment </Button>
      <Button variant="outline-secondary" onClick={deleteThisComment} className="m-2" style={{ height: '100%' }}> DELETE </Button>
    </Card>
  );
}

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    content: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

export default CommentCard;
