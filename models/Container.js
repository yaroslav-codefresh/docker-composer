const {BaseSchema, mongoose, referenceField} = require('./index');

const ContainerSchema = new BaseSchema({
  name: String,
  image: String,
  ports: [Number],
  volumes: [referenceField('Volume')],
  networks: [referenceField('Network')]
});

module.exports = mongoose.model('Container', ContainerSchema);