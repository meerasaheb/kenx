var http = require('http');
var express = require('express');
var app = express();
var pg =require('pg');
// var knex = require('knex')(connection);

console.log("bookself");
var knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: '5432',
        user: 'postgres',
        password: 'saheb',
        database: 'onetomany'
            //filename: './db.pg'
    }
});
var bookshelf = require('bookshelf')(knex);
 var port = 3000;
var Book = bookshelf.Model.extend({
  tableName: 'books',
  pages: function() {
    return this.hasMany(Page);
  }
});

var Page = bookshelf.Model.extend({
  tableName: 'pages',
  book: function() {
    return this.belongsTo(Book);
  }
});


// bookshelf.knex.schema.createTable('books',function(table){
//     table.increments('id').primary();
//     table.string('name');
//      }).then()
// bookshelf.knex.schema.createTable('pages', function(table) {
//     table.increments('id').primary();
//     table.string('content');
//     table.integer('book_id').references('books.id')
//   }).then()

// new Book({name: 'New Article'}).save().then(function(insert) {
//  console.log("insert");
// });

// new Page({content: 'meerasaheb',book_id :1}).save().then(function(model) {
//   console.log(model);
// });
Book.where('id', 1).fetch({withRelated:'pages'}).then(function(book) {
 
  console.log(book.toJSON());
 
}).catch(function(err) {
 
  console.error(err);
 
});
app.listen(port);
console.log("server is runing............")     