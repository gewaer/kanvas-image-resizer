require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const app = express();
const controllers = require('./controllers');

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

app.use('/api', controllers);

app.listen(PORT, () => {
  console.log(`kanvas-image-resizer listening on port ${PORT}`)
})
