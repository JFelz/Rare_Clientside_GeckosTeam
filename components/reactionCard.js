import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { postReaction } from '../api/reactionData';
import { useAuth } from '../utils/context/authContext';
// import { checkUser, registerUser } from '../utils/auth';

export default function ReactionCard({ Obj, postObj }) {
  const [singleReact, setSingleReact] = useState([]);
  const [singlePost, setSinglePost] = useState([]);
  // const [singleUser, setSingleUser] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (Obj.id) setSingleReact(Obj.id);
    if (postObj.id) setSinglePost(postObj.id);
  }, [Obj, user, postObj]);

  // const userPayload = {
  //   FirstName: user.displayName,
  //   LastName: user.displayName,
  //   Email: user.email,
  //   ProfileImage: user.photoURL,
  //   Uid: user.uid,
  // };

  // const testUser = () => {
  //   checkUser(user.uid).then(setSingleUser);
  //   console.log('Checking User:', singleUser);
  //   registerUser(user).then(setSingleUser);
  //   console.log('Register User:', singleUser);
  // };

  // Line 35 - 47, is to submit into PostReaction table upon click.
  const payload = {
    PostId: singlePost,
    ReactId: singleReact,
    UserId: user.uid,
  };

  const handleSubmit = () => {
    if (Obj.id) {
      postReaction(payload);
      console.log('Post Id:', singlePost, 'React Id:', singleReact, 'User uid:', user.uid);
    }
  };

  console.log('This is the singleReact:', singleReact);

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
          />
        </button>
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
