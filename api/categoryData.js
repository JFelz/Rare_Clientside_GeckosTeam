const getAllCategories = () => new Promise((resolve, reject) => {
  fetch('https://localhost:7284/rareserver/categories/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createCategory = (payload) => new Promise((resolve, reject) => {
  fetch('https://localhost:7284/rareserver/categories/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((resp) => resp.json())
    .then(resolve)
    .catch(reject);
});

const updateCategory = (categoryId) => new Promise((resolve, reject) => {
  fetch('https://localhost:7284/rareserver/categories/{categoryId}', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoryId),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    }).catch(reject);
});

const deleteCategory = (categoryId) => new Promise((resolve, reject) => {
  fetch('https://localhost:7284/rareserver/categories/{categoryId}', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoryId),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    }).catch(reject);
});
// const getSingleCategory = (categoryId) => new Promise((resolve, reject) => {
//   fetch(`https://localhost:7284/rareserver/categories/${categoryId}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => resolve(data))
//     .catch(reject);
// });

export {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
