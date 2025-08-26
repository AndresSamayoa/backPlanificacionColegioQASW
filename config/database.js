
module.exports = {
  // Connection to main db
  dbMainDatabase: process.env.DB_MAIN_DATABASE,
  dbMainUsername: process.env.DB_MAIN_USER,
  dbMainPassword: process.env.DB_MAIN_PASSWORD,
  dbMainHost: process.env.DB_MAIN_HOST,
  dbMainPort: process.env.DB_MAIN_PORT,
  dbMainDialect: process.env.DB_MAIN_DIALECT,
  dbMainPoolMax: process.env.DB_MAIN_POOL_MAX,
  dbMainPoolMin: process.env.DB_MAIN_POOL_MIN,
}
