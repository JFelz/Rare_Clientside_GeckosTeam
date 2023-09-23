import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { postComment, updateComment } from '../../api/commentData';

const initialState = {
  content: '',
};
// this is a comment
function CommentForm({ obj, commentId }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  // const { user } = useAuth();

  useEffect(() => {
    if (obj.id) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateComment(formInput)
        .then(() => router.push(`/comments/${obj.id}`));
    } else {
      const payload2 = {
        ...formInput,
        commentId,
      };
      postComment(payload2).then(({ name }) => {
        const patchPayload = { id: name };
        updateComment(patchPayload).then(() => {
          router.push(`/comments/${commentId}`);
        });
      });
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      {/* TITLE INPUT  */}
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
        <Button type="submit" variant="outline-warning" style={{ marginBottom: '30px' }}>{obj.id ? 'Update' : 'Post'} Your Comment</Button>
      </div>
    </Form>
  );
}

CommentForm.propTypes = {
  obj: PropTypes.shape({
    content: PropTypes.string,
    id: PropTypes.string,
  }),
  commentId: PropTypes.string.isRequired,
};

CommentForm.defaultProps = {
  obj: initialState,
};

export default CommentForm;
