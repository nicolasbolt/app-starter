import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

let mongod

export const connectTestDB = async () => {
  console.log('Creating test database...')
  mongod = await MongoMemoryServer.create()
  console.log('Getting uri...')
  const uri = mongod.getUri()

  console.log('Connecting...')
  await mongoose.connect(uri)
  console.log('Connected!')
}

export const closeTestDB = async () => {
  if (mongod) {
    console.log('Dropping test database...')
    await mongoose.connection.dropDatabase()
    console.log('Closing mongoose connection...')
    await mongoose.connection.close()
    console.log('Stopping MongoMemoryServer...')
    await mongod.stop()
    console.log('Test database closed!')
  }
}
