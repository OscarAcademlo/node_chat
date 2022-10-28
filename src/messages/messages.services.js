const messagesControllers = require("./messages.controlleres");

const getAllMessages = (req, res) => {
    messagesControllers
    .getAllMessages()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const getMsgByConversationId = (req, res) => {
    const conversationId = req.params.conversation_id
    messagesControllers.getMsgByConversationId(conversationId)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}


const createMessage = (req, res) => {
    const userId = req.user.id //? Este es el id del usuario loggeado
    const { conversationId, message } = req.body;
  
      if (
        userId &&
        conversationId &&
        message
      ) {
          //? Ejecutamos el controller
          messagesControllers.createMessage({
            userId, conversationId, message
          })
              .then( data => {
                  res.status(201).json(data)
              })
              .catch(err => {
                  res.status(400).json(err.message)
              })
      } else {
      //? Error cuando no mandan todos los datos necesarios para crear un usuario
          res.status(400).json({message: 'Err, all fields must be completed', fields: {
              userId: 'uuid',
              conversationId: 'uuid',
              message: 'string'
          }})
      }
  };

  const getMsgByMessageId = (req, res) => {
    const conversationId = req.params.conversation_id
    const id             = req.params.message_id
    messagesControllers.getMsgByMessageId(id,conversationId)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
  }
  const deleteMsgByMessageId = (req, res) => {
    const conversationId = req.params.conversation_id
    const id             = req.params.message_id
    messagesControllers.deleteMsgByMessageId(id,conversationId)
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
    getAllMessages,
    getMsgByConversationId,
    createMessage,
    getMsgByMessageId,
    deleteMsgByMessageId
}