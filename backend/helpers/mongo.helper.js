const mongoose = require('mongoose');

const connect = async () => {
  const url = 'mongodb://localhost:27017/expressmongojest';
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log('Database connected');
  } catch {
    console.error('Database failed');
  }
};

const disconnect = async () => {
  await mongoose.connection.close();
};

module.exports = { connect, disconnect };
