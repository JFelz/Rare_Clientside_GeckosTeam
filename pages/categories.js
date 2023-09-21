import React, { useEffect, useState } from 'react';
import CategoryCard from '../components/CategoryCard';
import getAllCategories from '../api/categoryData';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    getAllCategories().then(setCategories);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '22vh',
          padding: '7px',
          maxWidth: '100px',
          margin: '0 auto',
        }}
      >
        <h1>Categories!</h1>

      </div>
      <div className="d-flex justify-content-between">
        {categories?.map((category) => (
          <CategoryCard categoryObj={category} />))}
      </div>
    </>
  );
}
