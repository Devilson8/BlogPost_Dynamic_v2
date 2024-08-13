import {} from 'dotenv/config';
import express from 'express';
import cors from 'cors';

//Starting express middleware
const app = express();
const PORT_API = process.env.PORT_API ?? 8080;

//express body Parsing
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10kb' }));

/**Dates */
const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const d = new Date();
let months = month[d.getMonth()];

let days = d.getDate();
let year = d.getFullYear();

// Memory data store
let triPosts = [
  {
    id: 1,
    title: 'An Island Paradise Adventure',
    content:
      'My journey began in Kingston, the energetic capital of Jamaica. The city’s dynamic vibe is palpable, with music and art',
    author: 'Tonia Lima',
    date: `${days} ${months}, ${year}`,
  },
  {
    id: 2,
    title: 'My Unforgettable Trip to Greece',
    content:
      'Greece has always been on my travel bucket list, and I finally got the chance to explore its stunning landscapes',
    author: 'Angela Simpson',
    date: `${days} ${months}, ${year}`,
  },
  {
    id: 3,
    title: 'Discovering Indonesia: A Journey of Cultural and Natural Wonders',
    content:
      'My journey began in Jakarta, Indonesia’s vibrant capital. The city is a melting pot of modernity and tradition, with towering skyscrapers standing alongside historical',
    author: 'Tim cutt',
    date: `24 May, ${year}`,
  },
  {
    id: 4,
    title: 'What if I travelled to 50 countries in one day?',
    content:
      'The place is a melting pot of modernity and tradition, with towering skyscrapers standing alongside historical',
    author: 'Jonny Travolta',
    date: `17 April, ${year}`,
  },
];

//GET All posts
app.get('', (req, res) => {
  res.json(triPosts);
});

//GETS a specific post by id
app.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const postId = triPosts.find((post) => post.id === id);
  res.json(postId);
  res.status(404).json({ message: 'Page not found!' });
});

// Makes a new post
app.post('', (req, res) => {
  const newPost = {
    id: triPosts.length + 1,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: `${days} ${months}, ${year}`,
    button: '',
  };
  triPosts.unshift(newPost);
  res.json(newPost);
});

//PATCHES a post when you want to update only one parameter
app.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const existingPost = triPosts.find((post) => post.id === id);

  const replacePost = {
    id: id,
    title: req.body.title || existingPost.title,
    content: req.body.content || existingPost.content,
    author: req.body.author || existingPost.author,
    date: req.body.date || existingPost.date,
  };

  const searchPost = triPosts.findIndex((post) => post.id === id);

  triPosts[searchPost] = replacePost;
  res.json(replacePost);
});

//DELETE a specific post by providing the post id.
app.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const searchPost = triPosts.findIndex((post) => post.id === id);

  if (searchPost > -1) {
    res.sendStatus(200);
    triPosts.splice(searchPost, 1);
  } else {
    res.status(400).json({ error: `Posts with ${id} not found` });
  }
});

app.listen(PORT_API, () => {
  console.log(`API server is running on ${PORT_API}...`);
});
