var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var axios = require('axios');
const Models = require('../model/models.js');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 6007;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.post('/mapChange', (req, res) => {
  console.log('inside /mapChange');
  console.log('req.body.bounds: ', req.body.bounds)
  Models.psqlOnChange(req, res, req.body.bounds)
  
});


app.get('/items', (req, res) => {
  // console.log('hitting /items express');
  Models.psqlRetrieveAll(req, res);
  
});

app.get('/items/:id', (req, res) => {
  Models.psqlRetrieveOne(req, res);
});


app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});


module.exports = app;