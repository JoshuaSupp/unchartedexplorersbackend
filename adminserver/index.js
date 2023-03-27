const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2")
const cors = require("cors");

const db = mysql.createPool({
    host: "meuse1e01.ctkbmmck7oaa.us-east-1.rds.amazonaws.com",
    user: 'admin',
    password: 'se1e01123#',
    database: 'unchartedexplorersdb'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

//table users (getting data from users)
app.get("/api/get", (req,res) =>{
    const sqlGet = "SELECT * FROM users";
    db.query(sqlGet,(error,result)=>{
        res.send(result);
    })
})

//Add users Data
app.post("/api/post", (req,res)=>{
    const {username,password,email,department,contact} = req.body;
    const sqlInsert = 
    "INSERT INTO users (username,password,email,department,contact) VALUES (?,?,?,?,?)";
    db.query(sqlInsert, [username,password,email,department,contact], (error, result)=>{
        if(error){
            console.log(error);
        }
    });

});

//Delete Admin Data from username
app.delete("/api/remove/:username", (req,res)=>{
    const {username} = req.params;
    const sqlRemove =
     "DELETE FROM users WHERE username = ?";
    db.query(sqlRemove, username, (error, result)=>{
        if(error){
            console.log(error);
        }
    })

})


app.get("/", (req,res)=>{
    // const sqlInsert = "INSERT INTO users (username,password,email,department,contact) VALUES ('Sam','sam123','samfam@gmail.com','instructor','7734393')";
    // db.query(sqlInsert,(error,result)=>{
    //     console.log("error",error);
    //     console.log("result",result);
    //     res.send("Hello Express")
    // })
    
})

app.listen(5001, () =>{
    console.log("Server is running on port 5001 (adminserver)")
})