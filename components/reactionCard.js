import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getSingleUser } from '../api/userData';
import {
  getIdCount,
  getUserPostReaction,
  postNewReaction,
  updateUserPostReaction,
} from '../api/reactionData';
// import { postReaction } from '../api/reactionData';

export default function ReactionCard({ Obj, postObj }) {
  const [singleReact, setSingleReact] = useState([]);
  const [singlePost, setSinglePost] = useState([]);
  const [singleUser, setSingleUser] = useState();
  const [postReaction, setPostReaction] = useState();
  const [showCurrentCount, setShowCurrentCount] = useState([]);
  const { user } = useAuth();

  function getUserId() {
    // Need this userId to check in postReactions table.
    getSingleUser(user.uid).then(setSingleUser);
    console.log('Checking User:', singleUser);
  }

  const payload = {
    PostId: singlePost,
    ReactionId: singleReact,
    UserId: singleUser?.id,
  };

  function putOrPostReactions() {
    if (singleUser?.id === postReaction[0]?.userId) {
      updateUserPostReaction(postReaction[0]?.id, payload);
    } else if (singleUser?.id !== postReaction[0]?.userId) {
      postNewReaction(payload);
      console.log('New payload to DB set:');
    }
  }

  const handleSubmit = () => {
    if (Obj.id) {
      putOrPostReactions();
    }
    // Disable reaction count below this line
    if (postObj.id) {
      getIdCount(singlePost).then(setShowCurrentCount);
    }
  };

  useEffect(() => {
    if (Obj.id) setSingleReact(Obj.id);
    if (postObj.id) setSinglePost(postObj.id);
    getUserId();
  }, []);

  useEffect(() => {
    getUserPostReaction(singleUser?.id).then((data) => setPostReaction(data));
  }, [postReaction, singleUser]);

  return (
    <>
      <div>
        <button type="submit" value="Submit" className="Button1">
          <Card.Img
            variant="top"
            src={Obj.imageUrl}
            alt="Image Failure"
            onClick={handleSubmit}
            style={{
              height: '50px',
              width: '50px',
              objectFit: 'cover',
              borderRadius: '100%',
            }}
            {...showCurrentCount.length}
          />
        </button>
        <h1>
          {showCurrentCount.length}
        </h1>
      </div>
    </>
  );
}

ReactionCard.propTypes = {
  Obj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string,
    imageUrl: PropTypes.string,
  }).isRequired,
  postObj: PropTypes.shape({
    postUserId: PropTypes.number,
    Content: PropTypes.string,
    productPrice: PropTypes.number,
    id: PropTypes.number,
  }).isRequired,
};
