const users = [];
const bcrypt = require("bcryptjs");

module.exports = {
  login: (req, res) => {
    console.log("Logging In User");
    console.log(req.body);
    const { username, password } = req.body;
    for (let i = 0; i < users.length; i++) {
      if(users[i].username === username){
        console.log("in the if")
        const existing = bcrypt.compareSync(password, users[i].passHash)
        if(existing){
          let usersToReturn = {...users[i]}
          delete usersToReturn.passHash
          console.log(usersToReturn)
          res.status(200).send(usersToReturn)
          return
        }
      }
      // if (users[i].username === username && users[i].password === password) {
      //   res.status(200).send(users[i]);
      // }
    }
    res.status(400).send("User not found.");
  },
  register: (req, res) => {
    console.log("Registering User");
    console.log(req.body);
    const { username, email, firstName, lastName, password } = req.body;
    const salt = bcrypt.genSaltSync(5);
    const passHash = bcrypt.hashSync(password, salt);

    let newUserObj = {
      username,
      email,
      firstName,
      lastName,
      passHash
    };
    
    users.push(newUserObj);
    let usersToReturn = { ...newUserObj };
    delete usersToReturn.passHash;
    res.status(200).send(req.body);
    console.log(users)
  },
};

