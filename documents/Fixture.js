var mongoose = require('../dbn');
const Schema = mongoose.Schema;

const schema = new Schema({
    team1: { type: String, required: true },
    team2: { type: String, required: true },
    cretedBy: { type: Schema.Types.ObjectId, ref: 'User'},
    dateTime: { type: Date, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Fixture', schema);