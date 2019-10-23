require('dotenv').config();
const mongojs  = require('mongojs');
const db = mongojs(process.env.MONGO_URI, ['subscriptions']);

exports.handler = (event, context, callback)=>{
    if(event.httpMethod === 'POST'){
        return callback({
            statusCode: 201,
            body: {
                message: `Subscription saved`
            }
        })
    } else {
        return callback({
            statusCode: 405,
            body: {
                error: `Endpoint doesn't accept that request method`
            }
        });
    }
}