import { posts } from "../data/posts.data.js";


/* 
FUNZIONE CHE MOSTRA LA LISTA COMPLETA DEI POSTS
COME PAGINA PRINCIPALE
metodo : 'GET'   http://localhost:3000/posts
*/
function index(request, response) {
    const { tags: searchTags, } = request.query;

    if (searchTags === undefined) {
        return response.json(posts);
    }

    if (searchTags.trim() === '') {
        return response.status(400)
            .json({
                errore: 'valore vuoto, per favore riempi "?tags="',
                risultato: null
            });
    }

    const postFiltered = posts.filter(post => {
        for (let z = 0; z < post.tags.length; z++) {
            console.log(post.tags[z].indexOf(searchTags));
            if (post.tags[z].indexOf(searchTags) !== -1) {
                return true;
            }
        }

        return post.tags.includes(searchTags);
    })

    response.json(postFiltered);
}

/* 
FUNZIONE CHE MOSTRA IL POST CHE ABBIAMO CERCATO 
E PASSATO TRAMITE PARAMETRO NELL'URL
metodo : 'GET'  http://localhost:3000/posts/1
*/
function show(request, response) {
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

    const postFound = posts.find(post => {
        return post.id === realId;
    });

    if (postFound === undefined) {
        response.status(400)
            .json({
                errore: 'post non trovato',
                risultato: null
            })
        return;
    }

    response.json({
        errore: null,
        risultato: postFound
    });
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
function destroy(request, response) {
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

    const postFound = posts.findIndex(post => {
        return post.id === realId;
    });

    if (postFound === -1) {
        response.json({
            errore: 'post non trovato',
            risultato: null
        })
        return;
    }

    posts.splice(postFound, 1);

    response.json(posts);
}

export {
    index,
    show,
    store,
    update,
    modify,
    destroy,
}