const exp = require('express')
const adminApi = exp.Router();
const oracledb = require('oracledb');
oracledb.autoCommit = true;
const moment=require("moment")
const expressErrorHandler = require("express-async-handler");
const nodemailer=require("nodemailer")
//const { response, json } = require('express');
const uniqid=require('uniqid');
const bcrypt = require('bcrypt');
require('dotenv').config()
let adminDataBase;

//connecting to oracle database
oracledb.getConnection(
    {
      user          : process.env.DBUSER,
      password      : process.env.DBPASS,
      connectString : "localhost/XE"
    },
    function(err, connection)
    {
        if (err) { console.error(err); return; }
         //when connection is successfull
      adminDataBase=connection;
      console.log("Connection to Data base was successful")
    });

    //login authentication

    adminApi.post("/login", expressErrorHandler(async (req, res) => {
        //gettig data from api
        loginObj=req.body;
        inputId=loginObj.id
        inputPassword=loginObj.password;
        //retreviewing the password respected to the username received
        let adminAuth =await adminDataBase.execute(`SELECT password from admin where adminid=${inputId}`)
        hashedPassword=adminAuth.rows[0][0];
        passwordMatched=false;
        //if it returns empty array then invalid id 
        if(adminAuth.rows.length==0){
            res.send({message:"Invalid Id"})
        }
        //if it returns non empty array then verify password
        else{
            bcrypt.compare(inputPassword, hashedPassword).then(function(result) {
                if(result){
                    res.send({message:"successful"})
                }
                else{
                    res.send({message:"unsuccessfull"})
                }
            });
        }
    }))

    //change password  of admin
    adminApi.put("/changepassword/:id",expressErrorHandler(async(req,res)=>{
        let adId=(+req.params.id);
        let newPassword=req.body.newPassword;
        newHashedPassword=await bcrypt.hash(newPassword, 10);
        await adminDataBase.execute(`update admin set password='${newHashedPassword}' where adminid=${adId}`);
        //console.log(await adminDataBase.execute(`select * from admin`));
        res.send({message:"Password Updated Successfully"});
    }))

    //forgot password of amdin
    adminApi.put("/forgotpassword",expressErrorHandler(async(req,res)=>{
        let id=req.body.id;
        let tomailres=await adminDataBase.execute(`select email from admin where adminid=${id}`);
        if(tomailres.rows.length==0){
            res.send({message:"Invalid Id"})
        }
        else{
        let tomail=tomailres.rows[0][0];   
        //auto generating new password
        let newPass=makePassword(8);
        newHashedPassword=await bcrypt.hash(newPass, 10);
        //updating newpassword in admin table
        await adminDataBase.execute(`update admin set password='${newHashedPassword}' where adminid=${id}`)
        //sending new password to user mail id using newpassemail function
        let funcres=newPassmail(tomail,newPass);
        res.send({message:"New password sent to mail"});
        }
    }))

    //get request for users list from admin
    adminApi.get("/getuserslist",expressErrorHandler( async(req,res)=>{
        let usersList= await adminDataBase.execute("select customer.custid,custname,custaddress,custmobileno,custdob,custemail,accno,accbal,custaadharno,custpanno,status from customer,account where customer.custid=account.custid order by accno desc");
        res.send({message:usersList})
    }))

    
    //updating userdetails by admin
    adminApi.put("/updateuser/:id",expressErrorHandler(async(req,res)=>{
        let idUp=(+req.params.id);
        let updateObj=req.body;
        let custName=updateObj.custname,custAddress=updateObj.custaddress,custDob=updateObj.custdob,custPhone=updateObj.custmobileno,custEmail=updateObj.custemail;
        custDob=moment(custDob).utc().format('YYYY-MM-DD')
        let fdate=await adminDataBase.execute(`SELECT TO_CHAR(TO_DATE('${custDob}','YYYY-MM-DD'),'DD-MON-YYYY') FROM DUAL`)
        bind=fdate.rows[0]
        await adminDataBase.execute(`update customer set  custdob=:1,custName='${custName}',custaddress='${custAddress}',custmobileno='${custPhone}',custemail='${custEmail}' where custid=${idUp}`,bind);
        res.send({message:"Updated Successfully"})
    }))

    //deleting user account by admin
    adminApi.delete("/deleteaccount/:id",expressErrorHandler( async(req,res)=>{
        //accesing the id that to be deleted from url
        let deleteId=(+req.params.id);
        let deleteAcc=await adminDataBase.execute(`select accno from account where custid=${deleteId}`)
        //deleting account details
        await adminDataBase.execute(`delete from account where custid=${deleteId}`);
        //deleting the user details 
        await adminDataBase.execute(`delete from customer where custid=${deleteId}`);
        //deleting the user transactions
        let deleteAccNum=deleteAcc.rows[0][0]
        await adminDataBase.execute(`delete from transaction where accno=${deleteAccNum}`)
        res.send({message:"User Account Deleted Successfully"});
    }))

    //for balance enquiry
    adminApi.get("/getbalance/:id",expressErrorHandler( async(req,res)=>{
        let balanceInquiryAccNo=(+req.params.id);
        let balance=await adminDataBase.execute(`select accbal from account where accno=${balanceInquiryAccNo}`);
        if(balance.rows.length==0){
            res.send({message:"Please enter a valid account number"})
        }
        else{
        res.send({message:balance});
        }

    }))

    //for updating balance 
    adminApi.put("/updatebalance/:id",expressErrorHandler( async(req,res)=>{
        let updateBalanceId=req.params.id;
        updatedBalance=req.body.balance;
        //updating in the account table
        await adminDataBase.execute(`update account set accbal=${updatedBalance} where custid=${updateBalanceId}`)
        res.send({message:"Successfully Updated"})
    }))

    //for getting registered users data 
    adminApi.get("/getregistereduserdata",expressErrorHandler(async(req,res)=>{
        let usersList=await adminDataBase.execute("select * from register");
        res.send({message:usersList})

    }))

    //****function for creating a new unique customer id
    async function generateId(){
        // max id of the customer table
        let maxCustId=await adminDataBase.execute("select max(custid) from customer")
        //adding 1 to the max custId 
        return (+maxCustId.rows[0])+1
    }

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

    //****function for creating a new account number 
    async function generateAccNO(){
        let maxAccNo=await adminDataBase.execute("select max(accno) from account");
        return (+maxAccNo.rows[0])+1;
    }

    //Creating account by admin after verification of users requests which are stored in register table
    adminApi.post("/createaccount/usersrequest",expressErrorHandler(async(req,res)=>{
        //getting aadhar number from req.body
        newAccAadharNo=req.body.aadharno;
        //creating new and unique customer id for new uer
        let newId=await generateId();
        //creating new password
        let newPassword=makePassword(8);
        //creating new account number
        let newAccNo=await generateAccNO();
        //initial balance as 0
        let newAccBal=0;
        //Retreviewing the new user details from register table
        newCustDetails=await adminDataBase.execute(`select * from register where aadharno=${newAccAadharNo}`); 
        newCustDetails=newCustDetails.rows[0];
        //await adminDataBase.execute(`insert into customer values(${newId},'${newCustDetails[0]}','${newPassword}','${newCustDetails[2]}','${newCustDetails[3]}',${newCustDetails[4]},'${newCustDetails[1]}',${newCustDetails[5]},'${newCustDetails[6]}')`)
        //inserting new  user details into customer table
        newHashedPassword=await bcrypt.hash(newPassword, 10); 
        let bindCust=[newId,newCustDetails[0],newHashedPassword,newCustDetails[2],newCustDetails[3],newCustDetails[4],newCustDetails[1],newCustDetails[5],newCustDetails[6]];
        await adminDataBase.execute(`insert into customer values(:1,:2,:3,:4,:5,:6,:7,:8,:9)`,bindCust);
        //inserting account details into accounts table
        let bindAcc=[newId,newAccNo,newAccBal,'active'];
        await adminDataBase.execute(`insert into account values(:0,:1,:2,:3)`,bindAcc);
        //after creating the account delect the respective user details in the register table
        await adminDataBase.execute(`delete from register where aadharno=${newAccAadharNo}`)
        let mailconf=mail(newCustDetails[1],newId,newPassword,newAccNo);
        res.send({message:"Account Created"})
    }))

    //Creating account directly by the admin
    adminApi.post("/createaccount/adminrequest",expressErrorHandler(async(req,res)=>{
        //getting user details from the form filled by the admin
        newUserDetailsObj=req.body;
        //creating new and unique customer id for new uer
        let newUserId=await generateId();
        //creating new password
        let newUserPassword=makePassword(8);
        //creating new account number
        let newUserAccNo=await generateAccNO();
        //initial balance as 0
        let newUserAccBal=0;
        newUserDetailsObj.dob=moment(newUserDetailsObj.dob).utc().format('YYYY-MM-DD')
        let fdate=await adminDataBase.execute(`SELECT TO_CHAR(TO_DATE('${newUserDetailsObj.dob}','YYYY-MM-DD'),'DD-MON-YYYY') FROM DUAL`)
        fbind=fdate.rows[0][0]
        //inserting new user details into customer table
        newHashedPassword=await bcrypt.hash(newUserPassword, 10);
        let bindAdminCust=[newUserId,newUserDetailsObj.username,newHashedPassword,newUserDetailsObj.address,fbind,newUserDetailsObj.phoneno,newUserDetailsObj.email,newUserDetailsObj.aadharno,newUserDetailsObj.panno];
        await adminDataBase.execute(`insert into customer values(:1,:2,:3,:4,:5,:6,:7,:8,:9)`,bindAdminCust);
        //inserting new ubindAdminAcc=[]ser accout details into account table
        let bindAdminAcc=[newUserId,newUserAccNo,newUserAccBal,'active'];
        await adminDataBase.execute(`insert into account values(:0,:1,:2,:3)`,bindAdminAcc);
        //console.log(await adminDataBase.execute(`select * from customer where custid=${newUserId}`));
        //console.log(await adminDataBase.execute(`select * from account where custid=${newUserId}`));
        let mailco=mail(newUserDetailsObj.email,newUserId,newUserPassword,newUserAccNo);
        res.send({message:"Account Created"})

    }))

    // sending transaction history to the admin 
    adminApi.get("/transactionhistory",expressErrorHandler(async(req,res)=>{
        let transactionHistory=await adminDataBase.execute("select * from transaction order by trandate desc");
        res.send({message:transactionHistory});
    }))


    //function for generating unique Transaction Id . 
    //npm install uniqid
    function generateTranId(){
        return uniqid.time("TRAN",)
    }

    //***************transactions by admin
    //1.withdrawl
    adminApi.put("/withdrawl",expressErrorHandler(async(req,res)=>{
        let withdrawlObj=req.body;
        let tranAccno=withdrawlObj.accno;
        let withDrawlAount=withdrawlObj.amount;
        let availaBal=withdrawlObj.prevbal-withDrawlAount;
        //updating the balance in the account table
        await adminDataBase.execute(`update account set accbal=${availaBal} where accno=${tranAccno}`);
        //console.log(await adminDataBase.execute(`select * from account where accno=${tranAccno}`));
        //adding transaction to the transaction table
        newTranId=generateTranId();
        let wbind=[newTranId,tranAccno,'withdrawl',withDrawlAount,null,availaBal]
        await adminDataBase.execute(`insert into transaction values(:1,to_char(sysdate,'dd-mon-yyyy'),:2,:3,:4,:5,:6)`,wbind);
        //console.log(await adminDataBase.execute(`select * from transaction where tranid='${newTranId}'`));
        res.send({message:"Withdrawl Successfull"});

    }))

    //2.Deposit
    adminApi.put("/deposit",expressErrorHandler(async(req,res)=>{
        let depositObj=req.body;
        let tranAccno=depositObj.accno;
        let depositAmount=depositObj.amount;
        let availaBal=depositObj.prevbal+depositAmount;
        //updating the balance in the account table
        await adminDataBase.execute(`update account set accbal=${availaBal} where accno=${tranAccno}`);
        //console.log(await adminDataBase.execute(`select * from account where accno=${tranAccno}`));
        //adding transaction to the transaction table
        newTranId=generateTranId();
        let dbind=[newTranId,tranAccno,'deposit',null,depositAmount,availaBal]
        await adminDataBase.execute(`insert into transaction values(:1,to_char(sysdate,'dd-mon-yyyy'),:2,:3,:4,:5,:6)`,dbind);
        //console.log(await adminDataBase.execute(`select * from transaction where tranid='${newTranId}'`));
        res.send({message:"Successfully Deposited"});
    }))

    //3.Transactions
    adminApi.put("/transfer",expressErrorHandler(async(req,res)=>{
        let transferObj=req.body;
        let toUserAccNo=transferObj.toAccNo;
        let testToAcc=await adminDataBase.execute(`select custid from account where accno=${toUserAccNo}`)
        if(testToAcc.rows.length==0){
            res.send({message:"Please enter valid \n ** To Account Number **"})
        }
        else{
        let fromUserAccNo=transferObj.fromAccNo;
        let fromUserPrevBal=transferObj.prevbal;
        let transferAmount=transferObj.amount;
        let fromUserAftBal=fromUserPrevBal-transferAmount;
        let toUserPrevBal=await adminDataBase.execute(`select accbal from account where accno=${toUserAccNo}`);
        toUserPrevBal=toUserPrevBal.rows[0][0]
        let toUserAftBal=toUserPrevBal+transferAmount;
        //updating from user balance in account table
        await adminDataBase.execute(`update account set accbal=${fromUserAftBal} where accno=${fromUserAccNo}`);
        //updating to user balance in account table
        await adminDataBase.execute(`update account set accbal=${toUserAftBal} where accno=${toUserAccNo}`);
        //getting new transaction id
        newTransferId=generateTranId();
        //updating from-user transaction details in transaction table
        let fbind=[newTransferId,fromUserAccNo,'to account '+toUserAccNo,transferAmount,null,fromUserAftBal];
        await adminDataBase.execute(`insert into transaction values(:1,to_char(sysdate,'dd-mon-yyyy'),:2,:3,:4,:5,:6)`,fbind);
        //updating to-user transaction details in transaction table
        let tbind=[newTransferId,toUserAccNo,'from account '+fromUserAccNo,null,transferAmount,toUserAftBal];
        await adminDataBase.execute(`insert into transaction values(:1,to_char(sysdate,'dd-mon-yyyy'),:2,:3,:4,:5,:6)`,tbind);
        // console.log(await adminDataBase.execute(`select * from transaction where tranid='${newTransferId}'`));
        res.send({message:"Transaction Successfull"})
        }


    }))
    //*********
    //nodemailer

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAILUSERNAME,
          pass: process.env.MAILPASSWORD
        }
      });
      //function for sending  new  login details to user through registered mail
      function mail(to,id,pass,accnum){
      var mailOptions = {
        from: 'narcosbank21@gmail.com',
        to: `${to}`,
        subject: 'New account login details',
        text: `Welcome to Narcos Bank .Your new login details are \n Customer Id : ${id} \n Password : ${pass} \n Account Number :${accnum} \n Please change your password.`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          return error;
        } else {
          return 'Email sent';
        }
      });
      }

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
    
    




module.exports=adminApi;