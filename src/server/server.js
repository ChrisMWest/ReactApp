const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');
const http = require('http').Server(app);

const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
})

const users = {};

io.on("connection", (socket) => {
    console.log("socket: " + socket.id + " has connected");
    socket.on("disconnect", () => {
        console.log(socket.id + " disconnected");
        console.log(users)
        delete users[socket.id];
    })
    socket.on("user-connection", (args) => {
        console.log(args);
        users[socket.id] = args;
        console.log(users)
    })

    socket.on("message-to-user", (...args) => {
        console.log(args[0]);
        io.emit("everyone-message", "message sent to everyone")
        let key = Object.keys(users).find(key => users[key] === args[0]);
        console.log(key)
        if(key !== undefined) {
            console.log("entered")
            io.to(key).emit("private-message", "hello from " + socket.id, socket.id);
        }
        //io.to(args[0]).emit("hello, " + args[0]);
    });
})

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())



const mysql = require("mysql")

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "react_app",
    port: 3306,
    multipleStatements: true
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

app.use(bodyParser.json());


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
                res.send("Successful SignUp.");
            });
        } else {
            res.send("This username already exists.");
        }
        //console.log(results);
        
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
            res.send("Login OK.");
        }
    })
});

app.post('/newMedia', (req ,res) => {
    let query = "insert into media(MediaType, MediaName, MediaPriority, MediaOwner) values (?, ?, ?, ?)";
    let values = [req.body.mediaType, req.body.mediaName, req.body.mediaPriority, req.body.username];

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
    let query = "select MediaID as id, MediaType, MediaName, MediaPriority from media where MediaOwner=?";
    let values = [req.query.username];

    connection.query(query, values, (err, results, fields) => {
        if(err) {
            return console.error(err.message);
        }
        //console.log(results);
        res.send(results);
    })

})

app.get('/getUsers', (req ,res) => {
    let query = "select username from accounts";

    connection.query(query, (err, results, fields) => {
        if(err) {
            return console.error(err.message);
        }
        //console.log(results);
        res.send(results);
    })

})

app.get("/getFriends", (req, res) => {
    let query = "select FriendTwo as username from friends where FriendOne=?";
    let values = [req.query.username];

    //console.log(values);

    connection.query(query, values, (err, results, fields) => {
        if(err) {
            return console.error(err.message);
        }
        //console.log(results);
        res.send(results);
    })
})

app.post('/newFriendship', (req ,res) => {
    let query = "insert into friends(FriendOne, FriendTwo) values (?, ?); insert into friends(FriendTwo, FriendOne) values (?, ?);";
    let values = [req.body.username, req.body.recipient, req.body.username, req.body.recipient];

    connection.query(query, values, (err, results, fields) => {
        if(err) {
            return console.error(err.message);
        }
        res.send("Success");
        console.log("insertion was successful");
    })

})

app.post('/deleteFriendship', (req ,res) => {
    let query = "delete from friends where (FriendOne=? and FriendTwo=?) or (FriendTwo=? and FriendOne=?);";
    let values = [req.body.username, req.body.recipient, req.body.username, req.body.recipient];

    connection.query(query, values, (err, results, fields) => {
        if(err) {
            return console.error(err.message);
        }
        res.send("Success");
        console.log("insertion was successful");
    })

})




http.listen(port, () => {
    console.log("Example app listenting on port: " + port);
})