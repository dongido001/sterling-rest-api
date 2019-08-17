var mongoose = require('../dbn');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, unique: true, required: true },
    logo: { type: String, required: true },
    detail: { type: String, required: true },
    cretedBy: { type: Schema.Types.ObjectId, ref: 'User'},
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Team', schema);