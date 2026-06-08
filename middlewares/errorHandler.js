function errorHandler(error, request, response, next) {
    console.log(error);
    
    response.status(500)
        .json({
            errore: error.message,
            risultato: "null"
        })
}
export default errorHandler