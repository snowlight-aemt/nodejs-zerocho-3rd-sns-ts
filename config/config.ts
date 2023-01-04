export default {
  "development": {
    "username": "root",
    "password": "nodejsbook",
    "database": "nodebird",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "nodebird",
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": "nodebird",
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
} as const
// 수정을 하지 않음.