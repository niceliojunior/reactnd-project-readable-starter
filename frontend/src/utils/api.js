const api = "http://localhost:3001";

let token = localStorage.token;

if (!token) {
  token = localStorage.token = Math.random().toString(36).substr(-8);
}

const headers = {
  'Accept': 'application/json',
  'Authorization': 'token'
};

// GET /categories
export const getCategories = () => 
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data);

// GET /:category/posts
export const getPostsCategory = (category) =>
  fetch(`${api}/${category.path}/posts`, { headers })
    .then(res => res.json())
    .then(data => data.categoryPosts);

// GET /posts
export const getPosts = () => 
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data.posts);

// POST /posts
export const addPost = (post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json());

// GET /posts/:id
export const getPost = (post) => 
  fetch(`${api}/post/${post.id}`, { headers })
    .then(res => res.json())
    .then(data => data.post);

// POST /posts/:id
export const votePost = (post, option) =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  }).then(res => res.json());

// PUT /posts/:id
export const editPost = (post, title, body) =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, body })
  }).then(res => res.json());

// DELETE /posts/:id
export const delPost = (post) =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'DELETE',
    headers}).then(res => res.json());

// GET /posts/:id/comments
export const getCommentsFromPost = (post) => 
  fetch(`${api}/post/${post.id}/comments`, { headers })
    .then(res => res.json())
    .then(data => data.post);

// POST /comments
export const addPostComment = (comment) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(res => res.json());

// GET /comments/:id
export const getComment = (comment) => 
  fetch(`${api}/comments/${comment.id}`, { headers })
    .then(res => res.json())
    .then(data => data.post);

// POST /comments/:id
export const voteComment = (post, option) =>
  fetch(`${api}/comments/${post.id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  }).then(res => res.json());

// PUT /comments/:id
export const editComment = (comment, timestemp, body) =>
  fetch(`${api}/comments/${comment.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ timestemp, body })
  }).then(res => res.json());

// DELETE /comments/:id
export const delComment = (comment) =>
  fetch(`${api}/comment/${comment.id}`, {
    method: 'DELETE',
    headers}).then(res => res.json());