const router = require('express').Router()
const passport = require('passport')  //* Para rutas protegidas

const conversationsServices = require('./conversations.services')
require('../middlewares/auth.middleware')(passport) //* Para rutas protegidas
const adminValidate = require('../middlewares/role.middleware')
const userServices = require('../users/users.services')

router.route('/') 
 // 3.a 
    .get(passport.authenticate('jwt',   {session: false}),conversationsServices.getAllConversationsMe)
    .post(passport.authenticate('jwt', {session: false}),conversationsServices.createConversations)
 // 3.b 
router.route('/:conversation_id') 
    .get(passport.authenticate('jwt',{session: false}),conversationsServices.getConversationsById)
    .delete(passport.authenticate('jwt',{session: false}),conversationsServices.deleteConversation)    
    .patch(passport.authenticate('jwt', {session: false}),conversationsServices.patchConversation)

    module.exports = router