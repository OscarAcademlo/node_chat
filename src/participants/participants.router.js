const router = require('express').Router()
const passport = require('passport')
require('../middlewares/auth.middleware')(passport)
const participantsServices = require('./participants.services')
// const userServices = require('../users/users.services')
const adminValidate = require('../middlewares/role.middleware')

router.route('/:conversation_id/participants')
    .get(passport.authenticate('jwt',{session: false}),participantsServices.getPartByConversationId)
    .post(passport.authenticate('jwt',{session: false}),adminValidate,participantsServices.createPartConversation)
router.route('/:conversation_id/participants/:participant_id') 
    .get(passport.authenticate('jwt',{session: false}),participantsServices.deletePartConversationByPart)
    .delete(passport.authenticate('jwt',{session: false}),adminValidate,participantsServices.deletePartConversationByPart)   
module.exports = router