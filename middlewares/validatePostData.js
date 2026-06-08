function validatePost(request, response, next) {
    const { titolo, contenuto, img, tags } = request.body;

    if (titolo === undefined || typeof titolo !== 'string' || titolo.trim() === '') {
        return response.status(400)
            .json({
                errore: 'il campo "titolo" è obbligatorio e deve essere una stringa non vuota',
                risultato: null
            });
    }

    if (contenuto === undefined || typeof contenuto !== 'string' || contenuto.trim() === '') {
        return response.status(400)
            .json({
                errore: 'il campo "contenuto" è obbligatorio e deve essere una stringa non vuota',
                risultato: null
            });
    }

    if (img === undefined || typeof img !== 'string' || img.trim() === '') {
        return response.status(400)
            .json({
                errore: 'il campo "img" è obbligatorio e deve essere una stringa non vuota',
                risultato: null
            });
    }

    if (tags === undefined || !Array.isArray(tags)) {
        return response.status(400)
            .json({
                errore: 'il campo "tags" è obbligatorio e deve essere un array',
                risultato: null
            });
    }

    if (tags.length === 0) {
        return response.status(400)
            .json({
                errore: 'il campo "tags" non può essere un array vuoto',
                risultato: null
            });
    }

    const tagNonValidi = tags.some(tag => {
        return typeof tag !== 'string' || tag.trim() === '';
    });

    if (tagNonValidi) {
        return response.status(400)
            .json({
                errore: 'tutti i tag devono essere stringhe non vuote',
                risultato: null
            });
    }

    next();
}

export default validatePost;