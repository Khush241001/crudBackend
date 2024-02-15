const client = require('./connect.js');
const serverless = require('serverless-http');
const express = require('express');
const cors = require("cors");
const app = express();

app.listen(3000, function () {
    console.log("server started at port 3000")
})

client.connect();

const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
      'DELETE',
      'PUT'
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };

app.use(cors(corsOpts))

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get('/productList', (req, res) => {
    client.query(`Select * from crudtable`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
        else {
            console.log(err.message)
        }
    });
    client.end;
})

app.post('/productList', (req, res) => {
    const user = req.body;
    let insertquery = `insert into crudtable (productname,category,date,freshness,price,comment,id)
                        values('${user.productname}','${user.category}','${user.date}','${user.freshness}',${user.price},'${user.comment}','${user.id}')`

    client.query(insertquery, (err, result) => {
        if (!err) {
            res.send("Insertion Successful");
        }
        else {
            console.log(err.message);
        }
    });
    client.end;
})

app.put('/productList/:id', (req, res) => {
    const user = req.body;
    //const id = req.url.slice(req.url.lastIndexOf('/') + 1);
    console.log(req.params);

    let updatequery = `update crudtable
                        set productname = '${user.productname}',
                        category = '${user.category}',
                        date = '${user.date}',
                        freshness = '${user.freshness}',
                        price = ${user.price},
                        comment = '${user.comment}'
                        where id = '${req.params.id}';`

    client.query(updatequery, (err, result) => {

        if (!err) {
            res.send({ message: "updation successful" })
        }
        else {
            console.log(err.message);
        }
    });
    client.end;
})


app.delete('/productList/:id', (req, res) => {
    id = req.url.slice(req.url.lastIndexOf('/') + 1);
    // id = '${req.params.id}'
    //both above methods are correct to get the id
    let deletequery = `delete from crudtable where id = '${id}'`
    client.query(deletequery, (err, result) => {
        if (!err) {
            console.log("delete");
            res.send("deletion successful");
        }
        else {
            console.log(err.message);
        }
    });
    client.end;
})

module.exports.handler = serverless(app);