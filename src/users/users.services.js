const usersControllers = require("./users.controllers");

const getAllUsers = (req, res) => {
  usersControllers
    .getAllUsers()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const getUserById = (req, res) => {
  const id = req.params.id;
  usersControllers
    .getUserById(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).json({ message: err.message });
    });
};

const registerUser = (req, res) => {
  const {firstName, lastName, email, password, phone, birthday, gender, country, profileImage } = req.body;

    if (
        firstName &&
        lastName &&
        email &&
        password &&
        phone &&
        birthday &&
        profileImage
    ) {
        //? Ejecutamos el controller
        usersControllers.createUser({
            firstName, lastName, email, password, phone, birthday, gender, country, profileImage
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
            firstName: 'string',
            lastName: 'string',
            email: 'example@example.com',
            password: 'string',
            phone: '+521231231231',
            birthday: 'YYYY/MM/DD',
            profileImage: 'url'
        }})
    }
};

const patchUser = (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, phone, gender, country, profileImage } = req.body;

  usersControllers
    .updateUser(id, { firstName, lastName, phone, gender, country, profileImage })
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

const deleteUser = (req, res) => {
  const id = req.params.id;
  usersControllers
    .deleteUser(id)
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


//? *******************  My user Services **************************
const getMyUser = (req,res) =>{
  const id=req.user.id //?req.user contiene el token desencriptado (id)
  // res.status(200).json(data)

  usersControllers.getUserById(id)
  .then(data => {
      res.status(200).json(data)
  })
  .catch(err => {
    res.status(400).json({message: err.message})
  })
}

const pathMyUser = (req,res) =>{
  const id=req.user.id
  const { firstName, lastName, phone, gender, country, birhday } = req.body;

  usersControllers
  .updateUser(id, { firstName, lastName, phone, gender, country, birthday })
  .then(data => {
    res.status(200).json({message: 'Modified Successfully!'});
  })
  .catch(err =>{
    res.status(400).json({ message: err.message });
  })
}

const deleteMyUser = (req,res) => {
  const id=req.user.id
  usersControllers.updateUser(id,{status:'inactive'})
  .then((data) => {
    res.status(200).json({message: 'Your user was deleted succeefully'});
  })
  .catch(err => {
    res.status(400).json({ message: err.message });
  })
}

module.exports = {
    getAllUsers,
    getUserById,
    patchUser,
    registerUser,
    deleteUser,
    getMyUser,
    pathMyUser,
    deleteMyUser
}

