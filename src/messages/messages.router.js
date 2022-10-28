const router = require('express').Router()
const passport = require('passport')  //* Para rutas protegidas

const messagesServices = require('./messages.services')
require('../middlewares/auth.middleware')(passport) //* Para rutas protegidas
const userServices = require('../users/users.services')
const adminValidate = require('../middlewares/role.middleware')

//? rutas raiz
//3.C
router.route('/:conversation_id/messages')
    .get(passport.authenticate('jwt', {session: false}),messagesServices.getMsgByConversationId)
    .post(passport.authenticate('jwt',{session: false}),adminValidate,messagesServices.createMessage)
// 3.d
router.route('/:conversation_id/messages/:message_id')
    .get(passport.authenticate('jwt',{session: false}),messagesServices.getMsgByMessageId)
    .delete(passport.authenticate('jwt',{session: false}),adminValidate,messagesServices.deleteMsgByMessageId)
module.exports = router

// router.get('/',
// passport.authenticate('jwt',{session:false}),
// messagesServices.getAllMessages)

// router.post('/',
// passport.authenticate('jwt',{session:false}),
// messagesServices.postMessage)


//         module.exports = router