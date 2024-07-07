export default {
  "development": {
    "username": "postgresdb",
    "password": "root",
    "database": "superauto_db",
    "host": "superauto_db",
    "dialect": 'postgres'
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test", 
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
