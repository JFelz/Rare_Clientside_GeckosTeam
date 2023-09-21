// import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
// import getAllCategories from '../api/categoryData';

function CategoryCard({ categoryObj }) {
  console.log('this is the category obj:', categoryObj);
  return (

    <Card style={{ width: '18rem' }}>

      <Card.Title>{categoryObj?.label}</Card.Title>
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
