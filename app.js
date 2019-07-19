const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/api.js");
const morgan = require('morgan');

const app = express();
const port = 3000;

app.use(morgan('short'));
app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', router);

app.use((request, response, next) => {
    return response.status(404).send({message: 'Route: ' + request.url + ', Not found.'});
});

app.use((error, request, response, next) => {
    return response.status(500).send({message: error});
});

const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log(`Server listening on port ${server.address().port}`);
});

