const user = require("../models/userModel");

exports.getTransaction = (req,res,next) => {
    let userId = req.params.userId;
    user.find()
    .then((users) => {
        return res.render("transaction.ejs",{
            userId:userId,
            users:users
        })
    })
    .catch((err) => {
        console.log(err);
    })
}

exports.transferMoney = (req,res,next) => {
    console.log(req.body);
    let moneyToBeSent = parseInt(req.body.moneyToBeSent);
    let sentTo = req.body.sentTo;
    let sentBy = req.body.sentBy;
    user.findById(sentBy)
    .then((userData) => {
        if(moneyToBeSent > userData.balance){
            res.status(403);
            throw new Error("insufficient balance");
        }
        userData.balance -= moneyToBeSent;
        userData.save();
        return user.findById(sentTo);
    })
    .then((userData) => {
        if(!user){
            res.status(404);
            throw new Error("user not found");
        }
        userData.balance += moneyToBeSent;
        return userData.save();
    })
    .then(() => {
        res.redirect("/viewAll");
    })
    .catch((err) => {
        throw new Error(err);
    })
}