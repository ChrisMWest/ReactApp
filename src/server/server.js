const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


const mysql = require("mysql")

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "react_app",
    port: 3306
})

connection.connect((err) => {
    if(err){
        console.log("error connecting to database: " + err);
        return;
    } else {
        console.log("Connection established");
    }
})



const corsOptions = {
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));



app.get('/', (req, res) => {
    res.send("HelloWorld");
});

app.post('/signup', (req,res) => {
    let insertQuery = "insert into accounts(username, password) values (?, ?)";
    let checkQuery = "select * from accounts where username=?";
    let values = [req.body.username, req.body.password];

    connection.query(checkQuery, values, (err, results, fields) => {
        if(err) {
            return console.error(err.message);
        } else if(results.length == 0) {
            connection.query(insertQuery, values, (err, results, fields) => {
                if(err) {
                    return console.error(err.message);
                } 
                res.send("Successful SignUp");
            });
        } else {
            res.send("This username already exists");
        }
        console.log(results);
        
    })
});

app.post('/login', (req,res) => {
    let checkQuery = "select * from accounts where username=? and password=?";
    let values = [req.body.username, req.body.password];

    connection.query(checkQuery, values, (err, results, fields) => {
        if(err) {
            return console.error(err.message);
        } else if(results.length == 0){
            res.send("Username or password is wrong.");
        } else {
            res.send("Login OK");
        }
    })
});

app.post('/newMedia', (req ,res) => {
    let query = "insert into media(MediaType, MediaName, MediaPriority) values (?, ?, ?)";
    let values = [req.body.mediaType, req.body.mediaName, req.body.mediaPriority];

    connection.query(query, values, (err, results, fields) => {
        if(err) {
            return console.error(err.message);
        }
        res.send("Success");
        console.log("insertion was successful");
    })

})

app.post("/deleteMedia", (req, res) => {
    let query = "delete from media where MediaID=?"
    let values = [req.body.mediaID];

    connection.query(query, values, (err, results, fields) => {
        if(err) {
            return console.error(err.message);
        }
        res.send("deletion success");
        console.log("deletion was successful");
    })
})

app.get('/getMedia', (req ,res) => {
    let query = "select MediaID as id, MediaType, MediaName, MediaPriority from media";

    connection.query(query, (err, results) => {
        if(err) {
            return console.error(err.message);
        }
        res.send(results);
    })

})




app.listen(port, () => {
    console.log("Example app listenting on port: " + port);
})