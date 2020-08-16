var User = require('../Model/authModel');
const authModel = require('../Model/authModel');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');


exports.register = (req, res) => {
    const user = new User(req.body);
    if (!req.body.email && !req.body.name && !req.body.password ) {
        res.send({
            'success': false,
            'err_code': 234,
            'message': 'Email is Empty!,Name is Empty!,Password is Empty!'
        });
        return;
    }
    if (!req.body.email && !req.body.name ) {
        res.send({
            'success': false,
            'err_code': 234,
            'message': 'Email is Empty!,Name is Empty!'
        });
        return;
    }
    if (!req.body.email) {
        res.send({
            'success': false,
            'err_code': 234,
            'message': 'Email is Empty!'
        });
        return;
    }
    if (!req.body.password) {
        res.send({
            'success': false,
            'err_code': 234,
            'message': 'Password is Empty!'
        });
        return;
    }
    if (!req.body.name) {
        res.send({
            'success': false,
            'err_code': 234,
            'message': 'Name is Empty!'
        });
        return;
    }
    user.save((err, user) => {
        if (err) {
            res.json({ 'error': true, 'message': 'Error adding user .. !'+err });
        } else {
            res.json({ 'success': true, 'message': 'User added succesfully','data':user });
        }
    });
};

exports.login = (req,res)=>{
    // if(!req.body.email) {
    //     return res.status(400).send({
    //         message: "email can not be empty"
    //     });
    // }
    // if(!req.body.password) {
    //     return res.status(400).send({
    //         message: "password can not be empty"
    //     });
    // }
    User.findOne({email:req.body.email}, function(err, userInfo){
        if (err) {
            // next(err);
            res.json({error:true, message: "email does not match"});
        } else {
            if(userInfo){
                if(bcrypt.compareSync(req.body.password, userInfo.password)){
                    const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
                    res.json({success:true, message: "successfully", data:userInfo,'token':token});
                }else{
                    res.json({error:"true", message: "password does not match"});
                }
            }else{
                res.json({error:"true", message: "email does not match"});
            }
        }
   });
};

exports.getAllUser = (req, res) => {
    User.find().then(users => {
        res.json({success:true, message: "successfully", data:users});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// exports.getAllUser =(req,res)=>{
//     User.get(function(error,user){
//         if(error){
//             res.json({error:true,message:error})
//         }else{
//             res.json({success:true,data:user,message:"User retrieved successfully"})
//         }
//     })
// };

// exports.updateUser = (req,res)=>{
//     this.model.findOneAndUpdate({ 'references._id': req.params.id }, {
//     $set: {
//           'references.$.ref_name': req.body.ref_name,
//         }
//     }, { new: true })
//     .exec((err, updatedRef) => {
//         if (err) {
//         res.status(500).json({
//             'success': false,
//             'message': 'Tenant reference not updated'
//         });
//         return console.error(err);
//         }
//         res.json({
//         'success': true,
//         'message': 'Tenant reference updated successfully',
//         'data': updatedRef
//         });
//     })
// };


// Update a user identified by the user_id in the request
exports.updateUserById = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Name can not be empty"
        });
    }


    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.user_id, {
        name: req.body.name 
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id" + req.params.user_id
            });
        }else{
            res.send(user);
        }
        
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.user_id
            });                
        }
        return res.status(500).send({ message: "Error updating user with id " + req.params.user_id });
    });
};

exports.findOne = (req, res) => {
    User.findById(req.params.user_id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.user_id
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.user_id
            });  
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.user_id
        });
    });
};

// module.exports = {
//     create: function(req, res, next) {
//         User.create({ name: req.body.name, email: req.body.email, password: req.body.password }, function (err, result) {
//             if (err) {
//                 next(err);
//             }else{
//                 res.json({ 'success': true, 'message': 'User added succesfully','data':result });
//             }  
//        });
//     },
//     authenticate: function(req, res, next) {
//         User.findOne({email:req.body.email}, function(err, userInfo){
//             if (err) {
//             next(err);
//             } else {
//                 if(bcrypt.compareSync(req.body.password, userInfo.password)) {
//                     const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
//                     res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});
//                 }else{
//                     res.json({status:"error", message: "Invalid email/password!!!", data:null});
//                 }
//             }
//        });
//     },
// }
