const getAllreactions = () => new Promise((resolve, reject) => {
  fetch('https://localhost:7284/reactions', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleReaction = (Id) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7284/reactions/${Id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const postReaction = (payload) => new Promise((resolve, reject) => {
  fetch('https://localhost:7284/post/postreaction', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getAllreactions,
  getSingleReaction,
  postReaction,
};
