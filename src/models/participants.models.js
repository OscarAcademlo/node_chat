//? Crea el modelo de la tabla participants con sus campos
//? La llave foranea se identifica con el prefijo de la tabla a la cual pertenece

const db =require('../utils/database')
const { DataTypes } = require("sequelize");
const Users = require('./users.models');
const Conversations = require('./conversations.models');

const Participants = db.define("participants",{
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      conversationId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "conversation_id",
        references: {
            key: 'id',  //ID es la columna de la tabla conversations
            model: Conversations
        }
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "user_id",
        references: {
            key: 'id',  //ID es la columna de la tabla users
            model: Users
        }
    },
});

module.exports = Participants