import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FloatingLabel } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import {
  allCategories, createPost, findUser, updatePost,
} from '../../api/postData';

const initialState = {
  title: '',
  publicationDate: '',
  content: '',
  imageUrl: '',
  categoryId: 0,
};

export default function PostForm({ postObj }) {
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState([]);
  const [checkUser, setCheckUser] = useState([]);
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  console.log('this is the user obj', user);
  console.log('test check on postObj', postObj);

  useEffect(() => {
    if (postObj.id) setFormInput(postObj);
  }, [postObj, user]);

  useEffect(() => {
    allCategories().then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    findUser(user.uid).then((data) => setCheckUser(data));
  }, []);

  // console.log('these are the categories:', categories);
  console.log('this is the checkUser:', checkUser);
  console.log('this is the checkUserID:', checkUser?.[0]?.id);

  const handleClose = () => {
    setShow(false);
    router.push('/posts');
  };

  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const convertValue = name === 'categoryId' ? parseInt(value, 10) : value;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: convertValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postObj.id) {
      updatePost(formInput).then(() => {
        router.push('/posts');
        handleClose();
      });
    } else {
      const payload = {
        ...formInput, userId: checkUser?.[0]?.id, publicationDate: new Date(Date.now()), isApproved: false,
      };
      createPost(payload).then(() => {
        router.push('/posts');
        // onUpdate();
        setShow(false);
        setFormInput(initialState);
      });
    }
  };

  return (
    <>
      <Button
        variant="light"
        className=""
        onClick={handleShow}
        style={{ color: 'red', minWidth: '125px' }}
      >
        {postObj.id ? 'Update Post' : 'Create Post'}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="bg-black" closeButton>
          <Modal.Title style={{ color: 'red' }}>{postObj.id ? 'Update' : 'Create'} Post</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          <Form onSubmit={handleSubmit}>
            {/* Post Title  */}
            <FloatingLabel controlId="floatingInput1" label="Post Title" className="mb-3" style={{ color: 'red' }}>
              <Form.Control
                type="text"
                placeholder="Post Title"
                name="title"
                value={formInput.title}
                onChange={handleChange}
                required
              />
            </FloatingLabel>

            {/* Category Select  */}
            <FloatingLabel controlId="floatingInput1" label="Category" className="mb-3" style={{ color: 'red' }}>
              <Form.Select
                type="text"
                placeholder="Select Category"
                name="categoryId"
                value={formInput.categoryId}
                onChange={handleChange}
                required
              >
                <option> </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.label}</option>
                ))}
              </Form.Select>
            </FloatingLabel>

            {/* Post Content  */}
            <FloatingLabel controlId="floatingInput3" label="Post Content" className="mb-3" style={{ color: 'red' }}>
              <Form.Control
                type="text"
                placeholder="Post Content"
                name="content"
                value={formInput.content}
                onChange={handleChange}
                required
              />
            </FloatingLabel>

            {/* Image URL  */}
            <FloatingLabel controlId="floatingInput3" label="Image URL" className="mb-3" style={{ color: 'red' }}>
              <Form.Control
                type="text"
                placeholder="Image Url"
                name="imageUrl"
                value={formInput.imageUrl}
                onChange={handleChange}
                required
              />
            </FloatingLabel>

            <Button className="btn btn-dark" type="submit">{postObj.id ? 'Update' : 'Submit'}</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer />
      </Modal>
    </>
  );
}

PostForm.propTypes = {
  postObj: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    id: PropTypes.number,
    imageUrl: PropTypes.string,
    publicationDate: PropTypes.string,
  }),
  // onUpdate: PropTypes.func,
};

PostForm.defaultProps = {
  postObj: initialState,
  // onUpdate: null,
};
