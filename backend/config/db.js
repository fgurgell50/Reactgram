const mongoose = require("mongoose")
mongoose.set('strictQuery', false);


// connection
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

const conn = () => {
    try {
        const dbConn =  mongoose.connect( 
            `mongodb+srv://${dbUser}:${dbPassword}@cluster0.xbhlxut.mongodb.net/?retryWrites=true&w=majority`
        )
        console.log('Conectou ao Banco de Dados!')    
        return dbConn
    } catch (error) {
        console.log(error)
    }
}
conn()
module.exports = conn