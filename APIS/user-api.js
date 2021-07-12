//create mini express
const exp = require('express');
const userApi = exp.Router();
const moment=require("moment");
const nodemailer=require("nodemailer")
const oracledb = require('oracledb');
oracledb.autoCommit = true;
const expressErrorHandler = require("express-async-handler");
const uniqid=require('uniqid');
let userDataBase;
//connecting to oracle database
oracledb.getConnection(
    {
      user          : "NIT",
      password      : "NIT",
      connectString : "localhost/XE"
    },
    function(err, connection)
    {
        if (err) { console.error(err); return; }
      //when connection is successfull
      userDataBase=connection;
      console.log("Connection to Data base was successful")
    });

    //login authentication
    userApi.post("/login", expressErrorHandler(async (req, res) => {
        //gettig data from api
        loginObj=req.body;
        inputId=loginObj.id
        inputPassword=loginObj.password;
        //retreviewing the password respected to the username received
        let userList =await userDataBase.execute(`SELECT custpassword from customer where custid=${inputId}`)
        //if it returns empty array then invalid id 
        if(userList.rows.length==0){
            res.send({message:"Invalid Id"})
        }
        //if it returns non empty array then verify password 
        else{
       if(userList.rows[0]==inputPassword){
           res.send({message:"successful"})
       }
        else{
            res.send({message:"Invalid Password"})
        }
     }
    }))

    //get account number
    userApi.get("/accountno/:id",expressErrorHandler(async(req,res)=>{
        let accId=+req.params.id;
        let accno=await userDataBase.execute(`select accno from account where custid=${accId}`);
        res.send({message:accno})
    }))

    //fetching account balance
    userApi.get("/getbalance/:id",expressErrorHandler( async(req,res)=>{
        
        let balanceInquiryId=(+req.params.id);
        let balance=await userDataBase .execute(`select accbal from account where custid=${balanceInquiryId}`);

        res.send({message:balance});

    }))

    //updating balance after transactions
    userApi.put("/updatebalance/:id",expressErrorHandler(async (req,res)=>{
        updateId=req.params.id;
        updatedBalance=req.body.balance;
        //updating balance in account table
        await userDataBase.execute(`update account set accbal=${updatedBalance} where custid=${updateId}`);
        res.send({message:"Updated Successfully"})
    }))

    //account registration by the user
    userApi.post("/register",expressErrorHandler(async(req,res)=>{
        let newRegister=req.body;
        newRegister.dob=moment(newRegister.dob).utc().format('YYYY-MM-DD')
        let fdate=await userDataBase.execute(`SELECT TO_CHAR(TO_DATE('${newRegister.dob}','YYYY-MM-DD'),'DD-MON-YYYY') FROM DUAL`)
        fbind=fdate.rows[0][0]
        //adding the registered details in register table 
        await userDataBase.execute(`insert into register values
           ('${newRegister.username}',
            '${newRegister.email}',
            '${newRegister.address}',
            '${fbind}',
            '${newRegister.phoneno}',
            '${newRegister.aadharno}',
            '${newRegister.panno}')`)
        res.send({message:"Registered Successfully"})
    }))

    //user profile
    userApi.get("/viewprofile/:id",expressErrorHandler( async(req,res)=>{
        let userId=(+req.params.id)
        let profile=await userDataBase.execute(`select * from customer,account where account.custid=${userId} and customer.custid=${userId}`)
        res.send({message:profile})
    }))

    //changing password by user
    userApi.put("/changepassword/:id",expressErrorHandler(async(req,res)=>{
        let changePasswordObj=req.body;
        let changeId=(+req.params.id);
        let updatedPassword=changePasswordObj.newPassword;
        await userDataBase.execute(`update customer set custpassword='${updatedPassword}' where custid=${changeId}`)
        res.send({message:"Password Successfully Updated"})
    }))

    //forgot password of user
    userApi.put("/forgotpassword",expressErrorHandler(async(req,res)=>{
        let id=req.body.id;
        let tomailres=await userDataBase.execute(`select custemail from customer where custid=${id}`);
        if(tomailres.rows.length==0){
            res.send({message:"Invalid Id"})
        }
        else{
        let tomail=tomailres.rows[0][0];
        //auto generating new password
        let newPass=makePassword(8);
        //updating newpassword in admin table
        await userDataBase.execute(`update customer set custpassword='${newPass}' where custid=${id}`)
        //sending new password to user mail id using newpassemail function
        let funcres=newPassmail(tomail,newPass);
        res.send({message:"New password sent to mail"});
        }
    }))


    //****function for autogenerating a random password
    function makePassword(maxLength) {
        var collectionOfLetters = "@$&#%ABCDEFGHI0123456789JKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        var generatedPassword = "";
        var size = collectionOfLetters.length;
        for (var i = 0; i < maxLength; ++i) {
           generatedPassword = generatedPassword + collectionOfLetters.charAt(Math.floor(Math.random() * size));
        }
         return generatedPassword;
    }

    //transaction history of the user
    userApi.get("/transactionhistory/:accno",expressErrorHandler(async(req,res)=>{
        let accnum=(+req.params.accno);
        let tranList=await userDataBase.execute(`select * from transaction where accno=${accnum} order by trandate desc`);
        res.send({message:tranList})
    }))
    

    //transaction by the user
    //function for generating unique Transaction Id . 
    //npm install uniqid
    function generateTranId(){
        return uniqid.time("TRAN",)
    }
    //Transactions
    userApi.put("/transfer",expressErrorHandler(async(req,res)=>{
        let transferObj=req.body;
        let toUserAccNo=transferObj.toAccNo;
        let testToAcc=await userDataBase.execute(`select custid from account where accno=${toUserAccNo}`)
        if(testToAcc.rows.length==0){
            res.send({message:"Please enter valid \n ** To Account Number **"})
        }
        else{
        let fromUserAccNo=transferObj.fromAccNo;
        let fromUserPrevBal=transferObj.prevbal;
        let transferAmount=transferObj.amount;
        let fromUserAftBal=fromUserPrevBal-transferAmount;
        let toUserPrevBal=await userDataBase.execute(`select accbal from account where accno=${toUserAccNo}`);
        toUserPrevBal=toUserPrevBal.rows[0][0]
        let toUserAftBal=toUserPrevBal+transferAmount;
        //updating from user balance in account table
        await userDataBase.execute(`update account set accbal=${fromUserAftBal} where accno=${fromUserAccNo}`);
        //updating to user balance in account table
        await userDataBase.execute(`update account set accbal=${toUserAftBal} where accno=${toUserAccNo}`);
        //getting new transaction id
        newTransferId=generateTranId();
        //updating from-user transaction details in transaction table
        let fbind=[newTransferId,fromUserAccNo,'to account '+toUserAccNo,transferAmount,null,fromUserAftBal];
        await userDataBase.execute(`insert into transaction values(:1,to_char(sysdate,'dd-mon-yyyy'),:2,:3,:4,:5,:6)`,fbind);
        //updating to-user transaction details in transaction table
        let tbind=[newTransferId,toUserAccNo,'from account '+fromUserAccNo,null,transferAmount,toUserAftBal];
        await userDataBase.execute(`insert into transaction values(:1,to_char(sysdate,'dd-mon-yyyy'),:2,:3,:4,:5,:6)`,tbind);
        //console.log(await userDataBase.execute(`select * from transaction where tranid='${newTransferId}'`));
        res.send({message:"Transaction Successfull"})
        }


    }))

    //nodemailer

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'narcosbank21@gmail.com',
          pass: 'narcos2021'
        }
      });

    //fuction for sending new password to admin through registered mail
    function newPassmail(to,pass){
        var mailOptions = {
          from: 'narcosbank21@gmail.com',
          to: `${to}`,
          subject: 'New Password',
          text: `Your new password is ${pass}. \n Please change your password after successfull login. `
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            return error;
          } else {
            return 'Email sent';
          }
        });
    }
    







module.exports=userApi
