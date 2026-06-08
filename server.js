import express from 'express';
import { posts } from './data/posts.data.js';
import postsRouter from './routers/posts.router.js';
import notFound from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';

const url = process.env.SERVER_URL;
const port = process.env.SERVER_PORT || 3000;

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/posts', postsRouter);

app.get("/", (request, response) => {
    response.json({
        messaggio: 'va tutto ok nel server'
    });
});

app.get("/bacheca", (request, response) => {
    response.json(posts.map(post => {
        return {
            ...post,
            img: `http://${url}:${port}/${post.img}`,
        }
    }));
});

app.use(errorHandler);
app.use(notFound);

app.listen(port, (error) => {
    if (error) {
        console.error(error);
        return;
    }
    console.log('server in ascolto a questa porta: ', port);

});