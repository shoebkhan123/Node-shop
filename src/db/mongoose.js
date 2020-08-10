const mongoose = require('mongoose');

/* your username and password */
const USER = `user-name-her!`;
const PASS = `password-here!`;

/* connecting to mlab */
mongoose.connect(`mlab-db-url-with-user-name-and-password`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});


/* Connect to mongodb locally */
// mongoose.connect(`mongodb://127.0.0.1:27017/shop`, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// });
