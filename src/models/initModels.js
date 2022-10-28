//? Se importan todos los modelos
const Users = require('./users.models')
const Conversations = require('./conversations.models')
const Participants = require('./participants.models')
const Message = require('./messages.models')

const initModels = () => {
    // Relaciones
    // Relacion 1 -> *
    //? Conversaciones  pertenece a 1 usuario
    //? 1 usuario tiene muchas conversaciones

    Conversations.belongsTo(Users)
    Users.hasMany(Conversations)

    Participants.belongsTo(Users)
    Users.hasMany(Participants)

    Message.belongsTo(Users)
    Users.hasMany(Message)

    // Conversations.belongsTo(Participants)
    // Participants.hasMany(Conversations)

    // Conversations.belongsTo(Message)
    // Message.hasMany(Participants)

    Conversations.hasMany(Participants)
    Participants.belongsTo(Conversations)

    Conversations.hasMany(Message)
    Message.belongsTo(Conversations)

    Conversations.belongsTo(Users)
    Message.belongsTo(Users)

    Conversations.hasMany(Users)
    Users.belongsTo(Conversations)
    
    Message.hasMany(Participants)
    Participants.belongsTo(Message)

    Message.hasMany(Conversations)
    Conversations.belongsTo(Message)

    Message.hasMany(Users)
    Users.belongsTo(Message)

    Participants.hasMany(Conversations)
    Conversations.belongsTo(Participants)

    Participants.hasMany(Message)
    Message.belongsTo(Participants)

    Participants.hasMany(Users)
    Users.belongsTo(Participants)
}

module.exports = initModels