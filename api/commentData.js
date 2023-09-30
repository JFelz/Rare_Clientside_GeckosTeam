const getAllComments = () => new Promise((resolve, reject) => {
  fetch('https://localhost:7284/Comments/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleComment = (commentId) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7284/api/CommentsbyID/${commentId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteSingleComment = (commentId) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7284/api/Comment/${commentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const postComment = (commentId) => new Promise((resolve, reject) => {
  fetch('https://localhost:7284/api/Comment/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentId),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateComment = (commentId) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7284/api/Comments/${commentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentId),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getPostsComments = (postId) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7284/api/CommentsbypostID/${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getAllComments,
  getSingleComment,
  deleteSingleComment,
  postComment,
  updateComment,
  getPostsComments,
};
