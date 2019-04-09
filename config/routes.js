const axios = require("axios");
const bcrypt = require("bcryptjs");
const Users = require("../database/users/users-model");
const jwt = require("jsonwebtoken");

const { jwtKey, authenticate } = require("../auth/authenticate");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  let user = req.body;
  //change the user password into hashed password
  const hash = bcrypt.hashSync(user.password, 9); //9 is 2 to the power 9
  //override the userpassword with hash password
  user.password = hash;
  Users.add(user)
    .then(saved => {
      console.log(jwtKey);
      const token = generateToken(user);

      console.log("the token for this user is", token);
      res.status(201).json({ saved, token });
    })
    .catch(error => {
      console.log("Error on register", error);
      res.status(500).json(error);
    });
}

function login(req, res) {
  // implement user login
  let username = req.body.username;
  let password = req.body.password;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        console.log("you have logged in and here is your token", token);
        res.status(201).json({ token, message: `welcome ${user.username}` });
      } else {
        res.status(400).json({ message: "Invalid credentials" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: error });
    });
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  //const secret="my secret"
  const options = {
    expiresIn: "1d" //one day
  };
  return jwt.sign(payload, jwtKey, options);
}

function getJokes(req, res) {
  console.log("Jokes called...");
  const requestOptions = {
    headers: { accept: "application/json" }
  };

  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
// Implement the register function inside /config/routes.js.
//  Implement the login function inside /config/routes.js.
//  Use JSON Web Tokens for authentication.

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    
  };

  const options = {
    expiresIn: "1d"
  };

  // const secret = 'shhhhdonttellanyone';
  //console.log("Secret", jwtSecret) //jwtSecret is an object,secret should be string ,so consoled it
  //and found that jwtSecret has a member with the same name jwtsecret as the object containing the secret in form of string 
 //const jwtSecret = require("../config/secrets").jwtSecret;if I don't do .jwsecret then its object and to access it 
 //everywhere I need to put JwtSecret.jwtSecret; object name and inside the object string name is same
 
 return jwt.sign(payload, jwtKey, options);
}