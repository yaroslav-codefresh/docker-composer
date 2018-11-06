const mongoose = require('mongoose');
const Schema = mongoose.Schema;

class BaseSchema extends Schema {
  constructor(def, opts = {}) {
    super(...arguments);
    this.set('toJSON', {
      transform: function (doc, ret, options) {
        // remove the _id of every document before returning the result
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
      virtuals: true
    });
  }
}

function referenceField(model) {
  return {type: Schema.Types.ObjectId, ref: model}
}

module.exports.BaseSchema = BaseSchema;

module.exports.mongoose = mongoose;

module.exports.referenceField = referenceField;
