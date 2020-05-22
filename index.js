const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee'

});



mysqlConnection.connect((err) => {
    if(!err){
        console.log('Connection Successful');
    }
    else{
        console.log('There is some problem');
    }
});

app.listen(3000,()=>{
    console.log("DEVELOPING REST APIS");
})

app.get('/employees', (req, res)=>{
    mysqlConnection.query('SELECT * FROM Employee',(err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
});


app.get('/employees/:id', (req, res)=>{
    mysqlConnection.query('SELECT * FROM Employee WHERE EmpID = ? ',[req.params.id],(err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
});

app.post('/employees/create', function(req, res) {
    var Name = req.body.Name;
    var EmpCode = req.body.EmpCode;
    var Salary = req.body.Salary;
  
    var sql = `INSERT INTO Employee (Name, EmpCode, Salary) VALUES ("${Name}", "${EmpCode}", "${Salary}")`;
    mysqlConnection.query(sql, function(err, result) {
      if(err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      else{
      res.json({'status': 'success', id: result.insertId})
      }
    })
  });

app.put('/employees/update/:id', function(req, res) {
    var EmpID = req.params.id;
    var Name = req.body.Name;
    var EmpCode = req.body.EmpCode;
    var Salary = req.body.Salary;
  
    var sql = `UPDATE Employee SET Name="${Name}", EmpCode="${EmpCode}", Salary="${Salary}" WHERE EmpID=${EmpID}`;
    mysqlConnection.query(sql, function(err, result) {
      if(err) {
        res.status(500).send({ error: 'Something failed!' })
      }
      res.json({'status': 'success'})
    })
  });



app.delete('/employees/:id', (req, res)=>{
    mysqlConnection.query('DELETE FROM Employee WHERE EmpID = ? ',[req.params.id],(err, rows, fields)=>{
        if(!err){
            res.send('Deleted Successfully ');
        }
        else{
            console.log(err);
        }
    })
});



