var mongoose = require('mongoose');
mongoose.connect(
    `mongodb://${process.env.MONGODB_HOST}/test`, 
    {
        useNewUrlParser: true
    }
);

module.exports =  mongoose;