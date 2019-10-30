const path = require('path')
const express = require('express')


const app = express()
const staticDirPath = path.join(__dirname, '../Public/')
// const staticDirPath = (__dirname + '/public/')

const port = process.env.PORT || 3000
app.set('view engine', 'hbs')
app.use(express.static(staticDirPath))

app.get('', (req, res) => {

    res.render('index', {
        title: 'live App',
        name: 'Ruan'
    })
 })

 app.get('/about', (req, res) => {

     res.render('about', {
         title: 'live App - About Page',
         name: 'Ruan again'
     })
 })

 app.get('/help', (req, res) => {

     res.render('help', {
         title: 'live App - Help Page',
         name: 'Ruan again and again'
     })
 })


// app.get('/more', (req, res) => {

//     res.send('More!')
// })

app.listen(port, () => {
    console.log('server is running on port ' + port)
})