const {BaseSchema, mongoose} = require('./index');


const DriverOption = new BaseSchema({
  name: String,
  value: String
});

const NetworkSchema = new BaseSchema({
  name: String,
  driver: String,
  driverOptions: [DriverOption],
});

module.exports = mongoose.model('Network', NetworkSchema);