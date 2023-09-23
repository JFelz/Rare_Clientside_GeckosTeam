// import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { deleteCategory, getSingleCategory } from '../api/categoryData';
import CategoryForm from './forms/CategoryForm';

function CategoryCard({ categoryObj }) {
  const router = useRouter();
  const [singleCategory, setSingleCategory] = useState();

  useEffect(() => {
    getSingleCategory(categoryObj?.id).then((data) => setSingleCategory(data));
  }, [categoryObj]);

  const deleteACategory = () => {
    if (window.confirm('Delete this Category?')) {
      deleteCategory(categoryObj.id).then(() => router.push('/categories'));
    }
  };
  return (

    <Card style={{ width: '15rem' }}>

      <Card.Title>{categoryObj?.label}</Card.Title>
      <CategoryForm categoryObj={singleCategory} />
      <Button variant="danger" onClick={deleteACategory}>Delete</Button>
    </Card>
  );
}

CategoryCard.propTypes = {
  categoryObj: PropTypes.shape({
    categoryId: PropTypes.number,
    label: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

export default CategoryCard;
