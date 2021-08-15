const user = require("../models/userModel");

exports.viewAll = (req,res,next) => {
    user.find()
    .then((users) => {
        res.status(200).render("../views/viewAll.ejs",{
            users:users
        });
    })
    .catch((err) => {
        console.log(err);
    })
}
exports.viewOne = (req,res,next) => {
    let userId = req.params.userId;
    user.findById(userId)
    .then((user) => {
        if(!user){
            res.status(404);
            throw new Error("user does not exist");
        }
        return res.status(200).render("viewOne.ejs",user)
    })
}