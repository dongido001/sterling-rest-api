var mongoose = require('mongoose');
mongoose.connect(
    `mongodb://${process.env.MONGODB_HOST || 'localhost'}/test`, 
    {
        useNewUrlParser: true
    }
);

module.exports =  mongoose;