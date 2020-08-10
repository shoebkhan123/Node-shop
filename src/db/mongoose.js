const mongoose = require('mongoose');

/* your username and password */
const USER = `user-name-her!`;
const PASS = `password-here!`;

/* connecting to mongoDB server */
mongoose.connect(`mlab-db-url-with-user-name-and-password`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
