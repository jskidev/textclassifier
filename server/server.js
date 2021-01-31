require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
let routes = require('./routes/index')
let path = require('path')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use('/', routes);

let env = process.env.NODE_ENV;
if(env != "dev") {
    app.use(express.static(path.join(__dirname, '../client', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client', '/build', 'index.html'));
    });
}

let port = process.env.PORT
if(port == null || port == ""){
    port = 8000
}
app.listen(port, () => console.log("Sever started and listening on port: " + port));