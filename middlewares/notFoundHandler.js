

function notFound(request, response, next) {
    const ora = new Date().getHours();
    const minuti = new Date().getMinutes();
    console.log('sei passato di qui a questa ora: ', ora, minuti);
    
    response.status(404)
        .json({
            errore: "nessuna rotta trovata",
            risultato: null
        })
}
export default notFound