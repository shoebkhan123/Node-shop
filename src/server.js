const express = require('express');

require('./db/mongoose');

const productRoute = require('./routes/product');
const app = express();

const PORT = process.env.PORT || 3000;

/* Cross origin resourse sharing prevention */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

  if(req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, Patch, DELETE, GET')
      return res.status(200).json({})
  }
  next();
});

/* Middlewares  for images url, json to request and for routes */
app.use('/images',express.static('images'))
app.use(express.json());
app.use(productRoute);

/* Creating a node server which listining the port 3000 */
app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`);
});