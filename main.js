const http = require('http')
const fs = require('node:fs/promises')
require('dotenv').config()

const host = 'localhost'
const port = 8080

const httpServer = http.createServer(httpHandler)

httpServer.listen(port, host, () => {
    console.log(`HTTP server running at http://${host}:${port}/`)
    console.log(`Watch this funny video: ${process.env.VIDEO_URL}`)
})

async function httpHandler(req, res) {
    const routes = {
        '/': '/index',
        '/about': '/about',
        '/contact-me': '/contact-me'
    }
    
    const route = routes[req.url] || ''
    await load(route, res)
}

async function load(url, res) {
    let data
    try {
        data = await fs.readFile('./public' + url + '.html')
        res.writeHead(200, {'Content-Type': 'text/html'})
    } catch (err) {
        data = await fs.readFile(('./public/404.html'))
        res.writeHead(404, {'Content-Type': 'text/html'})
    } finally {
        res.write(data)
        res.end()
    }
}