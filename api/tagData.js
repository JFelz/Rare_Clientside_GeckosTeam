const getAllTags = () => new Promise((resolve, reject) => {
  fetch('https://localhost:7284/GetAllTags', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export default getAllTags;
