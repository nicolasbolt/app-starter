import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

let mongod

export const connectTestDB = async () => {
  mongod = await MongoMemoryServer.create()
  const uri = mongod.getUri()

  await mongoose.connect(uri)
}

export const closeTestDB = async () => {
  if (mongod) {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongod.stop()
  }
}
