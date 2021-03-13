require('dotenv').config();
const mongojs  = require('mongojs');
const db = mongojs(process.env.MONGO_URI, ['subscriptions']);

exports.handler = (event, context, callback)=>{
   return callback({
       statusCode: 200,
       body: event
   })
}