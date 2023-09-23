import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { postComment, updateComment } from '../../api/commentData';
// import { findUser } from '../../api/postData';

const initialState = {
  content: '',
};
// this is a comment
function CommentForm({ commentObj, postId, userId }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  // const [checkUser, setCheckUser] = useState([]);
  // const { user } = useAuth();

  useEffect(() => {
    if (commentObj.id) setFormInput(commentObj);
  }, [commentObj]);

  /* useEffect(() => {
    findUser(user.uid).then((data) => setCheckUser(data));
  }, []); */

  // console.log('this is the checkUser:', checkUser);
  // console.log('this is the checkUserID:', checkUser?.[0]?.id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentObj.id) {
      updateComment(formInput)
        .then(() => router.push(`/comments/${commentObj.id}`));
    } else {
      const payload2 = {
        ...formInput,
        Post: postId,
        User: userId,
      };
      postComment(payload2).then(({ name }) => {
        const patchPayload = { id: name };
        updateComment(patchPayload);
      });
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      {/* Content INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Enter Comment" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter comment details"
          name="content"
          value={formInput.content}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <div>
        {/* SUBMIT BUTTON  */}
        <Button type="submit" variant="outline-warning" style={{ marginBottom: '30px' }}>{commentObj.id ? 'Update' : 'Post'} Your Comment</Button>
      </div>
    </Form>
  );
}

CommentForm.propTypes = {
  commentObj: PropTypes.shape({
    content: PropTypes.string,
    id: PropTypes.number,
  }),
  postId: PropTypes.number,
  userId: PropTypes.number,

};

CommentForm.defaultProps = {
  commentObj: initialState,
  postId: PropTypes.number,
  userId: PropTypes.number,
};

export default CommentForm;
