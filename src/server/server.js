const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');



const corsOptions = {
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));



app.get('/', (req, res) => {
    res.send("HelloWorld");
});

app.get('/test', (req,res) => {
    res.send("Test worked!")
});

app.listen(port, () => {
    console.log("Example app listenting on port: " + port);
})