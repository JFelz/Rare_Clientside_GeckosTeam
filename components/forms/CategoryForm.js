import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createCategory, updateCategory } from '../../api/categoryData';
import { findUser } from '../../api/postData';

const initialState = {
  categoryLabel: '',
  id: 0,
};

export default function CategoryForm({ categoryObj }) {
  const [show, setShow] = useState(false);
  const [checkUser, setCheckUser] = useState([]);
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (categoryObj.id) setFormInput(categoryObj);
  }, [categoryObj, user]);

  useEffect(() => {
    findUser(user.uid).then((data) => setCheckUser(data));
  }, [user]);

  console.log('this is the checkUser:', checkUser);

  const handleClose = () => {
    setShow(false);
    router.push('/categories');
  };

  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const convertValue = name === 'id' ? parseInt(value, 10) : value;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: convertValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryObj.id) {
      updateCategory(formInput).then(() => {
        router.push('/categories');
        handleClose();
      });
    } else {
      const payload = { ...formInput, userId: 1 };
      console.log('this is the payload', payload);
      createCategory(payload).then(() => {
        router.push('/categories');
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
        {categoryObj.id ? 'Update Category' : 'Create Category'}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="bg-black" closeButton>
          <Modal.Title style={{ color: 'red' }}>{categoryObj.id ? 'Update' : 'Create'} Category</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          <Form onSubmit={handleSubmit}>
            {/* Category Title */}
            <FloatingLabel controlId="floatingInput1" label="Category Label" className="mb-3" style={{ color: 'red' }}>
              <Form.Control
                type="text"
                placeholder="Category Label"
                name="Label"
                value={formInput.label}
                onChange={handleChange}
                required
              />
            </FloatingLabel>
            <Button className="btn btn-dark" type="submit">{categoryObj.id ? 'Update' : 'Create'}</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

CategoryForm.propTypes = {
  categoryObj: PropTypes.shape({
    id: PropTypes.number,
    categoryLabel: PropTypes.string,
  }),
};

CategoryForm.defaultProps = {
  categoryObj: initialState,
};
