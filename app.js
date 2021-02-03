const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const port = process.env.PORT || 3000;

require('dotenv/config');

//middleware
app.use(bodyParser.json());
app.use(cors());

//routes
const PlayerRoute = require('./routes/crud_player');
const MatchRoute = require('./routes/crud_match');
const userRoutes = require('./routes/user')

app.use('/player',PlayerRoute);
app.use('/match', MatchRoute);
app.use('/api/auth',userRoutes);

//connect
const connect = mongoose.connect(process.env.DB_CONNECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(() => console.log('Mongoose DB Connected!'))
    .catch(err => {
        console.log(err);
    });

app.listen(port);

module.exports=connect