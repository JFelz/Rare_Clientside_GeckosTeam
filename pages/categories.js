import React, { useEffect, useState } from 'react';
import CategoryCard from '../components/CategoryCard';
import { getAllCategories } from '../api/categoryData';
import CategoryForm from '../components/forms/CategoryForm';

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
      <CategoryForm />
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '22vh',
          padding: '7px',
        }}
      >
        <h1>Categories!</h1>

      </div>
      <div className="d-flex flex-row justify-content-center">
        {categories?.map((category) => (
          <div key={category.id} style={{ marginRight: '10px' }}>
            <CategoryCard categoryObj={category} />
          </div>
        ))}
      </div>
    </>
  );
}
