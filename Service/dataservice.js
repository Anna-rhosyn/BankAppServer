//import jwt

const jwt=require('jsonwebtoken')

//import db.js

const db= require('./db')

userDetails ={ // object of objects
    1000:{acno:1000, username:'Anna' ,password:1000,balance:1000,transaction:[]},
    1001:{acno:1001, username:'Dani' ,password:1001,balance:1000,transaction:[]},
    1002:{acno:1002, username:'Amy' ,password:1002,balance:1000,transaction:[]}
  }

  const register=(acno,username,password)=>{
    
    return db.User.findOne({acno})//port 27017,backendport 3000
     
    .then(user=>{
      if(user){
        return {
          statusCode:401,
          status:false,
          message:'User already registered'
        }
      }
      else{
        const newUser= new db.User({
          acno,
          username,
          password,
          balance:0,
          transaction:[]
        })
        newUser.save()//to store data in mongodb
        return {
          statusCode:200,
          status:true,
          message:'Register success'
        
      }
      }
    })

//     if(acno in userDetails){
//       return {
//         statusCode:401,
//         status:false,
//         message:'User already registered'
//       }
//     }
//     else{
//       userDetails[acno]={
//         acno,
//         username,
//         password,
//         balance:0,
//         transaction:[]
//       }
//       console.log(userDetails);
      
//       return {
//         statusCode:200,
//         status:true,
//         message:'Register success'
      
//     }
// }

  }


  //login

   const login=(acno,pswd)=>{
    
    return db.User.findOne({acno, password:pswd})
       .then(user=>{
        if(user){
          currentUser=user.username
          currentAcno=acno;
               
          //token generation
           const token=jwt.sign({currentAcno:acno},'superkey2202')
           return {
            statusCode:200,
            status:true,
            message:'login Successfully',
            currentAcno,
            currentUser,
            token
           }
        }
        else{
          return {
            statusCode:401,
            status:false,
            message:'Incorrect username or  Password '
          }
        }
       })
    if(acno in userDetails){
      if(pswd==userDetails[acno]['password']){
        currentUser=userDetails[acno]['username']
        currentAcno=acno;
             
        //token generation
         const token=jwt.sign({currentAcno:acno},'superkey2202')
         return {
          statusCode:200,
          status:true,
          message:'login Success',
          currentAcno,
          currentUser,
          token
         }
      }
      else{
        return {
          statusCode:401,
          status:false,
          message:'Password Error'
        }
      }
    }
    else{
      return {
        statusCode:401,
        status:false,
        message:'Invalid user' 
      }
    }
  }

  //deposit

 const deposit=(acno,pswd,amt)=>
  {
    var amount=parseInt(amt);

      return db.User.findOne({acno, password:pswd})
      .then(User=>{
      if(User){
      User.balance+=amount;
      User.transaction.push({
        type:'Credit',
        amount:amount
      })
      User.save()
      
       
      return {
        statusCode:200,
        status:true,
        message:`${amount} is credited and balance is ${User.balance}`
      }
      
    }
    else{
      
      
      return {
        statusCode:401,
        status:false,
        message:'Invalid password or username' 
      }
            }
      })
      

      var amount=parseInt(amt);
      if(acno in userDetails){
        if(pswd==userDetails[acno]['password']){
          userDetails[acno]['balance']+=amount;
          userDetails[acno]['transaction'].push({
            type:'Credit',
            amount:amount
          })
           console.log(userDetails);
           
          return {
            statusCode:200,
            status:true,
            message:`${amount} is credited and balance is ${userDetails[acno]['balance']}`
          }
          
        }
        else{
          
          
          return {
            statusCode:401,
            status:false,
            message:'Invalid password' 
          }
        }
      }
      else{
       
        return {
        statusCode:401,
        status:false,
        message:'Invalid user details' 
        }
      }
  }

  //withdraw
  const withdraw=(acno,pswd,amt)=>{
    var amount=parseInt(amt)
    return db.User.findOne({acno, password:pswd})
      .then(user=>{
      if(user){
      user.balance-=amount;
      user.transaction.push({
        type:'Debit',
        amount:amount
      })
      user.save()
      
       
      return {
        statusCode:200,
        status:true,
        message:`${amount} is debited and balance is ${user.balance}`
      }
      
    }
    else{
      
      
      return {
        statusCode:401,
        status:false,
        message:'Invalid password or username' 
      }
            }
      })
    var amount=parseInt(amt);
    if(acno in userDetails){
      if(pswd==userDetails[acno]['password']){
       if( userDetails[acno]['balance']>amount){
        userDetails[acno]['balance']-=amount;
        userDetails[acno]['transaction'].push({
          type:'Debit',
          amount:amount
        })
         console.log(userDetails);
         
         return {
          statusCode:200,
          status:true,
          message:`${amount} is debited and balance is ${userDetails[acno]['balance']}`
        }
       }
       else{
        return {
          statusCode:401,
          status:false,
          message:'Insufficient balance' 
        }
       }
       
      }
      else{
        return {
          statusCode:401,
          status:false,
          message:'Invalid password' 
        }
      }
    }
    else{
      return {
        statusCode:401,
        status:false,
        message:'Invalid user details' 
        }
    }

  }


 const getTransaction=(acno)=>{  
  return db.User.findOne({acno})
    .then(user=>{
      if(user){
        return{
          statusCode:200,
          status:true,
          transaction: user.transaction
        }
      }
      else{
        return {
          statusCode:401,
          status:false,
          message:'Transfer error' 
          }
      }
    })
  

    // return{
    //   statusCode:200,
    //   status:true,
    //   transaction:userDetails[acno]['transaction']
    // }
  }

  //delete account
  const deleteAcc=(acno)=>{
     return db.User.deleteOne({acno})
     .then(user=>{
      if(user){
        return {
          statusCode:200,
          status:true,
          message:'Account deleted'
        }
      }
      else{
        return{
          statusCode:401,
          status:false,
          message:'Account not found'
        } }
     })
  }

//export

module.exports={
    register,
    login,
    deposit,
    withdraw,
    getTransaction,
    deleteAcc
    
}