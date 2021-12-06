const express = require('express');
var app = express();
const handlebars = require('hbs');
app.set('view engine', 'hbs');
app.use(express.urlencoded());
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://mati765:Mateusz123@cluster0.wupdp.mongodb.net/Cluster0?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let collection;
client.connect(err => {
    collection = client.db("mydb").collection("baza");

});
app.get('/', function (req, res) {
    res.render('dodawanie')
        ;
})
app.post('/', function (req, res) {
    console.log(req);

    var myobj = { ImieStudenta: req.body.firstName, NazwiskoStudenta: req.body.lastName };
    collection.insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("1 dokument wystawiony");

    });
    res.render('potwierdzenie');
})
var server = app.listen(8081);
client.close();