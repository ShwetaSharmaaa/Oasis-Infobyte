const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routers/routes');
const port = process.env.port || 8080;

const app = express();

// Database Connection
mongoose.connect('mongodb+srv://Loginauth-user:XSzisJSLvNBRyWk0@cluster0.0xtuhde.mongodb.net/loginAuthentication?retryWrites=true&w=majority')
.then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
});

app.set('view engine', 'ejs')

app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/', router)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
