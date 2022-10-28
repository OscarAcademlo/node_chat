const participantControllers = require('./participants.controllers')

const getPartByConversationId = (req, res) => {
    const conversationId = req.params.conversation_id
    participantControllers.getPartByConversationId(conversationId)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}

const createPartConversation = (req, res) => {
    const conversationId = req.params.conversation_id
    const { userId } = req.body
    if(userId){
        participantControllers.createPartConversation({ conversationId, userId })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    } else {
        res.status(400).json({
            message: 'Missing Data',
            fields: {
                userId: 'uuid',
                conversationId: 'uuid'
            }
        })
    }
  }

const getPartConversationByPart = (req, res) => {
    const conversationId = req.params.conversation_id
    const id = req.params.participant_id
    participantControllers.getPartConversationByPart(conversationId,id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}

const deletePartConversationByPart = (req, res) => {
    const conversationId = req.params.conversation_id
    const id             = req.params.participant_id
    participantControllers.deletePartConversationByPart(conversationId,id)
      .then((data) => {
        if (data) {
          res.status(204).json();
        } else {
          res.status(404).json({ message: "Invalid ID" });
        }
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  };

module.exports = {
    getPartByConversationId,
    createPartConversation,
    getPartConversationByPart,
    deletePartConversationByPart
}