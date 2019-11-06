const low = require('lowdb');
const fileSync = require('lowdb/adapters/FileSync');
const adapter = new fileSync('db.json');
const db = low(adapter);

db.defaults({todos: []}).write();
const Todo = db.get('todos');

module.exports = {
    db,
    Todo,
}