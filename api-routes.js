let router = require('express').Router();
var authentication_token = require('./UserAuth/validateUser');
// Import contact controller
var contactController = require('./Controller/contactController');
var userController = require('./Controller/authController');
//verified token
var verifyToken = authentication_token.validateUser;
router.route('/contacts')
    .get(contactController.index)
    .post(contactController.new);
router.route('/contacts/:contact_id')
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.delete);

// User routes
router.route('/register').post(userController.register);
router.route('/login').post(userController.login);
router.route('/getAllUser').get(verifyToken, userController.getAllUser);
router.route('/userById/:user_id').put(verifyToken, userController.updateUserById)
                            .get(verifyToken, userController.findOne);
// Export API routes
module.exports = router;