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

//table employees (getting data from employees)
app.get("/api/get", (req,res) =>{
    const sqlGet = "SELECT * FROM employees";
    db.query(sqlGet,(error,result)=>{
        res.send(result);
    })
})

//Add Employee Data
app.post("/api/post", (req,res)=>{
    const {employeefullname,employeeid,jobtitle,employeeratings} = req.body;
    const sqlInsert = "INSERT INTO employees (employeefullname,employeeid,jobtitle,employeeratings) VALUES (?,?,?,?)";
    db.query(sqlInsert,[employeefullname,employeeid,jobtitle,employeeratings], (error, result)=>{
        if(error){
            console.log(error);
        }
    })

})

//Delete Employee Data from username
app.delete("/api/remove/:id", (req,res)=>{
    const {id} = req.params;
    const sqlRemove =
     "DELETE FROM employees WHERE id = ?";
    db.query(sqlRemove, id, (error, result)=>{
        if(error){
            console.log(error);
        }
    })

})

//Update Employee data 
app.get("/api/get/:id", (req,res) =>{
    const {EmployeeID} = req.params;
    const sqlGet = "SELECT * FROM Employees where id = ? ";
    db.query(sqlGet, EmployeeID, (error,result)=>{
        if(error){
            console.log(error)
        }

        res.send(result);
    })
})

app.put("/api/put/:id", (req,res) =>{
    const {EmployeeID} = req.params;
    const {EmployeeFullName,JobTitle,EmployeeRatings} = req.body;
    const sqlUpdate = "UPDATE from Employees SET EmployeeFullName = ?, EmployeeID = ? JobTitle = ?, EmployeeRatings = ? WHERE id = ? ";
    db.query(sqlUpdate, [EmployeeFullName,EmployeeID,JobTitle,EmployeeRatings], (error,result)=>{
        if(error){
            console.log(error)
        }

        res.send(result);
    })
})


app.get("/", (req,res)=>{
    // const sqlInsert = "INSERT INTO Employees (employeefullname,employeeid,jobtitle,employeeratings) VALUES ('June Sun','00004','Instructor','5 Stars')";
    // db.query(sqlInsert,(error,result)=>{
    //     console.log("error",error);
    //     console.log("result",result);
    //     res.send("Hello Express")
    // })
    
})

app.listen(5000, () =>{
    console.log("Server is running on port 5000 (empserver)")
})