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

const getIdCount = (PostId) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7284/post/postreaction/${PostId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getUserPostReaction = (UserId) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7284/posts/user/${UserId}/reactions/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const updateUserPostReaction = (id, payload) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7284/postreaction/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(async (res) => {
      let data;
      if (res.ok) {
        data = await res.json();
        resolve(data);
      }
    })
    .catch(reject);
});

const postNewReaction = (payload) => new Promise((resolve, reject) => {
  fetch('https://localhost:7284/post/postreaction', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(async (res) => {
      let data;
      if (res.ok) {
        data = await res.json();
        resolve(data);
      }
    })
    .catch(reject);
});

export {
  getAllreactions,
  updateUserPostReaction,
  getIdCount,
  getSingleReaction,
  getUserPostReaction,
  postNewReaction,
};
