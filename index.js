//server create

//1 import express

const express = require('express')

//import dataservice

const dataservice= require('./Service/dataservice')

//import jwt

const jwt=require('jsonwebtoken')

//import cors

const cors = require('cors')

//2 create an app using express

const app = express();

//give command to share data via cors

app.use(cors({
    origin:['http://localhost:4200','http://192.168.43.54:8080']
}))

//To parse json from request body

app.use(express.json());

//create a port number 

app.listen(3000, ()=>{
    console.log('listening on the port 3000');
})

//application specific middleware

const middleware=(req,res,next)=>{
    console.log('application specific middleware');
    next();
}
   app.use(middleware)


   //Router specific middleware

   const jwtMiddleware=(req,res,next)=>{
     try{
        const token=req.headers['x-access-token'];
        console.log('Router specific middleware');
        const data=jwt.verify(token,'superkey2202')
        console.log(data);
        next();
     }
     catch{
        //422 Unprocessable error
        res.status(422).json({
            statusCode: 422,
            status:false,
            message:"please login "
        })
     }
   }

//4 Resolving HTTP requests

//GET METHOD - To get a data
app.get('/',(req,res)=>{
    res.send("GET METHOD");
})

//POST METHOD - To create a data
app.post('/',(req,res)=>{
    res.send("POST METHOD")
})

//PUT METHOD - To update a data completely
app.put('/',(req,res)=>{
    res.send("PUT METHOD")
})


//DELETE METHOD - To delete a data
app.delete('/',(req,res)=>{
    res.send("DELETE METHOD")
})

//PATCH METHOD - To update a data partially

app.patch('/',(req,res)=>{
    res.send("PATCH METHOD")
})
//API calls or Request

//login
//register
//deposit
//withdraw
//transaction

//Resolving register request

app.post('/register',(req,res)=>{
console.log(req.body);
 dataservice.register(req.body.acno,req.body.username,req.body.password)
.then(result=>{
    res.status(result.statusCode).json(result);
})
 
// if(result){
//     res.send('Successfully registered');
// }
// else{
//     res.send('User already registered');
// }

 });

 //Resolving login request

app.post('/login',(req,res)=>{
    console.log(req.body);
    dataservice.login(req.body.acno,req.body.password)
    .then(result=>{
        res.status(result.statusCode).json(result);
    })
   
    
     });

     //Resolving deposit request

app.post('/deposit',jwtMiddleware,(req,res)=>{
    console.log(req.body);
 dataservice.deposit(req.body.acno,req.body.password,req.body.amount)
 .then(result=>{
    res.status(result.statusCode).json(result);
    
 })
    
     });
      //Resolving withdraw request

     app.post('/withdraw',jwtMiddleware,(req,res)=>{
        console.log(req.body);
        dataservice.withdraw(req.body.acno,req.body.password,req.body.amount)
        .then(result=>{
            res.status(result.statusCode).json(result);
        })
        
        
         });

         //Resolving transaction request

     app.post('/transaction',jwtMiddleware,(req,res)=>{
        console.log(req.body);
        dataservice.getTransaction(req.body.acno)
        .then(result=>{
            res.status(result.statusCode).json(result);
        })
        
        
         });

         app.delete('/deleteAcc/:acno',(req,res)=>{
            dataservice.deleteAcc(req.params.acno)
            .then(result=>{
                res.status(result.statusCode).json(result);
            })
         })