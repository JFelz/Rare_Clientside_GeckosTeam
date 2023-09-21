import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createCategory, updateCategory } from '../../api/categoryData';

const initialState = {
  categoryLabel: '',
};

export default function CategoryForm({ categoryObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (categoryObj.categoryId) setFormInput(categoryObj);
  }, [categoryObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryObj.categoryId) {
      updateCategory(formInput)
        .then(() => router.push(`/categories/${categoryObj.categoryId}`));
    } else {
      const payload = { ...formInput, user: user.id = 1 };
      createCategory(payload).then(() => {
        router.push('/categories');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{categoryObj.categoryId ? 'Update' : 'Create'} Category</h2>

      {/* FIRST NAME INPUT */}
      <FloatingLabel controlId="floatingInput1" label="Category Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter A Category Title"
          name="categoryLabel"
          value={formInput.categoryLabel}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
    </Form>
  );
}

CategoryForm.propTypes = {
  categoryObj: PropTypes.shape({
    categoryId: PropTypes.number,
    categoryLabel: PropTypes.string,
  }),
};

CategoryForm.defaultProps = {
  categoryObj: initialState,
};
