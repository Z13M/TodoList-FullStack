import pg from 'pg'

const { Pool } = pg

const dbConfig = {
  host: "localhost",
  port:"5432",
  user:"postgres",
  password:"Versionne@123",
  database:"todo"
}

const client = new Pool(dbConfig)

export default client;


