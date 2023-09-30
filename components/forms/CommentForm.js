import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { postComment, updateComment } from '../../api/commentData';
import { findUser } from '../../api/postData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  content: '',
};
// this is a comment
function CommentForm({ commentObj, postId }) {
  const [setShow] = useState(false);
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const [checkUser, setCheckUser] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (commentObj.id) setFormInput(commentObj);
  }, [commentObj]);

  useEffect(() => {
    findUser(user.uid).then((data) => setCheckUser(data));
  }, []);

  const handleClose = () => {
    setShow(false);
    router.push('/comments');
  };

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
      updateComment(formInput).then(() => {
        router.push('/comments');
        handleClose();
      });
    } else {
      const payload = {
        ...formInput, userId: checkUser?.[0]?.id, createdOn: new Date(Date.now()),
      };
      postComment(payload).then(() => {
        router.push('/comments');
        // onUpdate();
        setShow(false);
        setFormInput(initialState);
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
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
        <Button type="submit" variant="outline-warning" style={{ marginBottom: '30px' }}>{postId ? 'Update' : 'Post'} Your Comment</Button>
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
  // userId: PropTypes.number,

};

CommentForm.defaultProps = {
  commentObj: initialState,
  postId: PropTypes.number,
  // userId: PropTypes.number,
};

export default CommentForm;
