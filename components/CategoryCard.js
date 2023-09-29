// import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { deleteCategory, getSingleCategory } from '../api/categoryData';
import CategoryForm from './forms/CategoryForm';
// import { getPostsByCategory } from '../api/postData';

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

  const viewCategoryPosts = () => {
    console.log('categoryId', categoryObj.categoryId);
    router.push(`/categoryPosts/${categoryObj?.id}`);
  };

  return (

    <Card style={{ width: '15rem' }}>

      <Card.Title>{categoryObj?.label}</Card.Title>
      <CategoryForm categoryObj={singleCategory} />
      <Button variant="danger" onClick={deleteACategory}>Delete</Button>
      <Button variant="primary" onClick={viewCategoryPosts}>View Posts</Button>
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
