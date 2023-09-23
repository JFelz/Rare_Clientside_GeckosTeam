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

const getSingleCategory = (categoryId) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7284/rareserver/categories/${categoryId}`, {
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
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateCategory = (payload) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7284/rareserver/categories/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteCategory = (categoryId) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7284/rareserver/categories/${categoryId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoryId),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const SubscribeToNewUser = (followerId, userId) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7284/rareserver/categories/${followerId}/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      followerId,
      userId,
    }),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getAllCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
