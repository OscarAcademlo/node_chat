//? Crea el modelo de la tabla messages con sus campos
//? La llave foranea se identifica con el prefijo de la tabla a la cual pertenece

const db =require('../utils/database')
const { DataTypes } = require("sequelize");
const Users = require('./users.models');
const Conversations = require('./conversations.models');

const Message = db.define("message",{
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
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
      conversationId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "conversation_id",
        references: {
            key: 'id',  //ID es la columna de la tabla conversations
            model: Conversations
        }
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
});

module.exports = Message