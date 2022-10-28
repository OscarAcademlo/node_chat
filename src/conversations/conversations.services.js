//? Dependences Services table Conversations
const conversationsControllers = require("./conversations.controllers");

const getAllConversationsMe = (req, res) => {
    conversationsControllers
    .getAllConversations()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};


 const createConversations  = (req, res) => {
  const userId = req.user.id
   const {title, imageUrl} = req.body

     if (
        title &&
        imageUrl &&
        userId 
     ) {
//         //? Ejecutamos el controller
conversationsControllers.createConversations({
          title, imageUrl, userId
         })
             .then( data => {
                 res.status(201).json(data)
             })
             .catch(err => {
                 res.status(400).json(err.message)
             })
     } else {
//     //? Error cuando no mandan todos los datos necesarios para crear un usuario
         res.status(400).json({message: 'Err, all fields must be completed', fields: {
          title: 'string',
          imageUrl: 'string',
          userId: 'uuid',
         }})
     }
 };

 const getConversationsById = (req, res) => {
   const id = req.params.id;
   conversationsControllers
     .getConversationsById(id)
     .then((data) => {
       res.status(200).json(data);
     })
     .catch((err) => {
       res.status(404).json({ message: err.message });
     });
 };


 const patchConversation = (req, res) => {
   const id = req.params.conversation_id;
   const { title, imageUrl } = req.body;

   conversationsControllers
     .updateConversation(id, { title, imageUrl})
     .then((data) => {
       if (data[0]) {
         res
           .status(200)
           .json({ message: `User with ID: ${id}, edited succesfully!` });
       } else {
         res.status(404).json({ message: "Invalid ID" });
       }
     })
     .catch((err) => {
       res.status(400).json({ message: err.message });
     });
 };

 const deleteConversation = (req, res) => {
   const id = req.params.conversations_id;
   conversationsControllers
     .deleteConversation(id)
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
    getAllConversationsMe,
    createConversations ,
    getConversationsById,
    patchConversation,
    deleteConversation
}

