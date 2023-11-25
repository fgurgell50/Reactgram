export const api = "http://localhost:5000/api"
//export const uploads = "http://localhost:5000/api/uploads"
// correcao para pegar a img 
export const uploads = "http://localhost:5000/uploads"

// metodos da req, dados q serao enviados, token , imagem
export const requestConfig = ( method, data, token = null, image = null) => {

    let config

    if( image ) {
        config = {
            method,
            body: data,
            headers: {},
        }
    } else if( method === "DELETE" || data === null ) {
        //like nao vai ter dados
        config = {
            method,
            headers: {},
        } 
    }else {
            config = {
                method,
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        }

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config

}
