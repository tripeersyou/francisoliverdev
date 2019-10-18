require('dotenv').config();
const faunadb = require('faunadb');
const q = faunadb.query
const client = new faunadb.Client({ secret: process.env.FAUNA_SECRET });

exports.handler = (event, context, callback)=>{
    return client.query(q.Create(q.Collection("pushSubscriptions"), { data: { id: "2"} }))
    .then(response => {
        console.log(response);
        return callback(null, {
            statusCode: 200,
            body: JSON.stringify(response)
        })
    }).catch(error =>{
        console.log(error)
        return callback(null,{
            statusCode: 400,
            body: JSON.stringify(error)
        });
    });;
}

// client.query(q.Create(q.Collection("pushSubscriptions"), { data: { id: "2"} })).then(response => console.log(response)).catch(err=>console.log(err));