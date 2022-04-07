require('dotenv').config()

module.exports = {
  api: {
    port: process.env.API_PORT || 3001
  },

  // MySQL
  mysql: {
    host: process.env.MYSQL_HOST || 'remotemysql.com',
    user: process.env.MYSQL_USER || 'vyU7DCqzKX',
    port: process.env.MYSQL_PORT || '3306',
    password: process.env.MYSQL_PASSWORD || 'hQ8gtxIQ9o',
    database: process.env.MYSQL_DATABASE || 'vyU7DCqzKX'
  }
}