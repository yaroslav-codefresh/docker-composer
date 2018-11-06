const {BaseSchema, mongoose} = require('./index');

const DriverOption = new BaseSchema({
  name: String,
  value: String
});

const VolumeSchema = new BaseSchema({
  name: String,
  driver: String,
  driverOptions: [DriverOption],
});

module.exports = mongoose.model('Volume', VolumeSchema);