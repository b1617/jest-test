const mongoose = require('mongoose');
const supertest = require('supertest');
const server = require('../app');

const init = () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterEach(async () => {
    await removeCollections();
  });

  afterAll(async () => {
    await removeDatabase();
    await disconnectDatabase();
    server.close();
  });

  return supertest(server);
};

const connectDatabase = async () => {
  const url = `mongodb://127.0.0.1/test`;
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

const disconnectDatabase = async () => {
  await mongoose.connection.close();
};

const removeCollections = async () => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
};

const removeDatabase = async () => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error) {
      if (
        error.message === 'ns not found' ||
        error.message.includes('a background operation is currently running')
      ) {
        return;
      }
    }
  }
};

module.exports = { init };
