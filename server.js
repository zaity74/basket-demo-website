import http from 'http'
import app from './app/app.js'


// CREATE SERVER HTTP 
/* with type de réponse dans le header, la response and status code */ 
/* Ou sinon App et on configure tous sa dans App */ 

const server = http.createServer((req, res) => {
    console.log(req.method, req.httpVersion, req.url, req.headers);
})

const port = 3306;
const hostname = 'localhost';

server.listen(port, console.log(`port is listening on port :${port}/`))
