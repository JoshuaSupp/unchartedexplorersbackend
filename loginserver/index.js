const express = require("express")
const mysql = require("mysql2")
const app = express();
const cors = require("cors")

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "admin",
  host: "meuse1e01.ctkbmmck7oaa.us-east-1.rds.amazonaws.com",
  password: "se1e01123#",
  database: "unchartedexplorersdb"
})



//for register
// app.post("/register", (req,res) => {

//   const username = req.body.username
//   const password = req.body.password

//   db.query(
//     "INSERT INTO user_information (username,password) VALUES (?,?)",
//     [username,password],
//     (err, result) => {
//       console.log(err);
//     }
//    ); 
// });


//for login
app.post("/login", (req,res) => {

  const email = req.body.email
  const password = req.body.password

  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email,password],
    (err, result) => {

      if (err){
        res.send({err: err});
      } 
        if (result.length>0){
          res.send(result)
        } 
        else{
          res.send({message: "Wrong Email/Password"})
        }
    }
   ); 
});


app.listen(3002,() =>{
  console.log("3002")
});