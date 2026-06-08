import { posts } from "../data/posts.data.js";
import connection from '../data/db.js';

/* 
FUNZIONE CHE MOSTRA LA LISTA COMPLETA DEI POSTS
COME PAGINA PRINCIPALE
metodo : 'GET'   http://localhost:3000/posts
*/
async function index(request, response) {
    const [rows] = await connection.query('SELECT * FROM posts');

    response.status(200)
        .json({
            error: null,
            results: rows
        });
}

/* 
FUNZIONE CHE MOSTRA IL POST CHE ABBIAMO CERCATO 
E PASSATO TRAMITE PARAMETRO NELL'URL
metodo : 'GET'  http://localhost:3000/posts/1
*/
async function show(request, response) {
    const { id } = request.params;
    const realId = Number(id.trim());

    if (isNaN(realId) || realId <= 0) {
        response.status(400)
            .json({
                errore: '"id" non corretto o minore di 0',
                risultato: null
            });
        return;
    }

    try {
        const [result] = await connection.execute(`
            DELETE FROM posts WHERE id = ?
            `
        [realId]
        );

        const postFound = postRows[0];

        const [tagResult] = await connection.execute(`
            SELECT *
            FROM tags
                JOIN post_tag
                    ON post_tag.tag_id = tags.id
            WHERE post_tag.post_id = ?;
            `,
            [realId]
        )

        const finalResult = {
            ...postFound,
            tags: tagResult
        };

        response.status(200)
            .json({
                error: null,
                risultato: finalResult
            });
    } catch (error) {
        console.error('errore: ' + error.message);
    }

}

/* 
FUNZIONE CHE MOSTRA PERMETTE DI AGGIUNGERE UN POST NEL NOSTRO
ARRAY DI POSTS
metodo : 'POST'  http://localhost:3000/posts
*/
function store(request, response) {
    const { titolo, contenuto, img, tags } = request.body;

    const newId = posts.length > 0
        ? Math.max(...posts.map(post => post.id)) + 1
        : 1;

    const newPost = {
        id: newId,
        titolo: titolo.trim(),
        contenuto: contenuto.trim(),
        img: img.trim(),
        tags: tags.map(tag => tag.trim())
    };

    posts.push(newPost);

    response.status(201)
        .json({
            errore: null,
            risultato: newPost
        });
}

function update(request, response) {
    const { id } = request.params;
    const realId = Number(id.trim());

    if (isNaN(realId) || realId <= 0) {
        response.status(400)
            .json({
                errore: '"id" non corretto o minore o uguale a 0',
                risultato: null
            });
    }

    const postIndex = posts.findIndex(post => post.id === realId);

    if (postIndex === -1) {
        response.status(404)
            .json({
                errore: 'post non trovato',
                risultato: null
            });
    }

    const { titolo, contenuto, img, tags } = request.body;

    const updatedPost = {
        id: realId,
        titolo: titolo.trim(),
        contenuto: contenuto.trim(),
        img: img.trim(),
        tags: tags.map(tag => tag.trim())
    };

    posts[postIndex] = updatedPost;

    response.json({
        errore: null,
        risultato: updatedPost
    });
}

function modify(request, response) {
    response.json({
        messaggio: 'hai inviato una richiesta di modificare parzialmente un elemento'
    })
}

/* 
FUNZIONE CHE MOSTRA PERMETTE DI ELIMINARE UN POST NEL NOSTRO
ARRAY DI POSTS
metodo : 'DELETE'  http://localhost:3000/posts
*/
async function destroy(request, response) {
    const { id } = request.params;
    const realId = Number(id.trim());

    if (isNaN(realId) || realId <= 0) {
        response.status(400)
            .json({
                errore: '"id" non corretto o minore di 0',
                risultato: null
            });
        return;
    }

    try {
        const [result] = await connection.execute(`
            DELETE FROM posts WHERE id = ?
            `
        [realId]
        );
    } catch (error) {
        console.error('errore: ' + error.message);
    }
}

export {
    index,
    show,
    store,
    update,
    modify,
    destroy,
}