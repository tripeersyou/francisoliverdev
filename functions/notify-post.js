require('dotenv').config();
const faunadb  = require('faunadb');
const q = faunadb.query
const client = new faunadb.Client({ secret: process.env.FAUNA_SECRET });

exports.handler =  (event, context, callback)=>{
    return client.query(q.Get(q.Match(q.Index("pushSubscriptions_by_id"), "1")))
    .then(response =>{
        console.log(reponse)
        return callback(null,{
            statusCode: 200,
            body: JSON.stringify(response.data)
        });
    }).catch(error =>{
        console.log(error)
        return callback(null,{
            statusCode: 400,
            body: JSON.stringify(error)
        });
    });
}

// client.query(q.Get(q.Match(q.Index("pushSubscriptions_by_id"), "1"))).then(res => console.log(res)).catch(err => console.log(err));