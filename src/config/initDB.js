require('dotenv').config()
const pool = require('./db.js')
const fs = require('fs')
const schema = fs.readFileSync('src/config/schemas.sql', 'utf8')

pool.query(schema).then(() => {
    console.log("Schema created successfully");
    pool.end();
}).catch((err) => {
    console.error("Error creating schema", err);
    pool.end();
});