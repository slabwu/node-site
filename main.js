const http = require('http')
const fs = require('fs')

const host = 'localhost'
const port = 8080

const httpServer = http.createServer(httpHandler)

httpServer.listen(port, host, () => {
    console.log(`HTTP server running at http://${host}:${port}/`)
})

function httpHandler(req, res) {
    const routes = {
        '/': '/index',
        '/about': '/about',
        '/contact-me': '/contact-me'
    }
    
    const route = routes[req.url] || '/404'
    loadRoute(route, res)
}

function loadRoute(url, res) {
    fs.readFile('./public' + url + '.html', (err, data) => {
        if (!err) {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(data)
            res.end()
        } else {
            res.writeHead(404, {'Content-Type': 'text/html'})
            res.end('404 Not Found')
        }
    })
}