require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const PORT = 8080
const filename = (file) => path.join(__dirname, 'public', file + '.html')

const routes = {
    '/': '/index',
    '/about': '/about',
    '/contact-me': '/contact-me'
}
const routesList = Object.keys(routes)

app.get(routesList, (req, res) => {
    const file = routes[req.path] || '/404'
    res.sendFile(filename(file))
})

app.use((req, res) => {
    res.status(404).sendFile(filename('404'))
})

app.listen(PORT, error => {
    if (error) throw error
    console.log(`Listening on port ${PORT}`)
    console.log(`Watch this funny video: ${process.env.VIDEO_URL}`)
})