const require('bcrypt');
// const { compare } = require('semver');
const User = require('../models/user');
const Token = require('../models/token')

const register = async (req, res) => {
    try{
          const data = req.body;

          // generate salt with a cost
          const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));

          // now we hash the password
          data["password"] = await bcrypt.hash(data["password"], salt);

          const result = await User.create(data)

          res.status(200).send(result);
    } catch(err) {
        res.status(400).json({"error": err.message})
    }
};
  

const login = async (req, res) => {
    const data = req.body;
    console.log(req.body);
    try { 

        const user = await User.getOneByUsername(data.username);

        const authenticated = await bcrypt.compare(data.password, user["password"]);
        
        if(!authenticated) {
            throw new Error("Incorrect user / password")
        } else {
            res.status(200).send('you are logged in')
        }
    } catch(err) {
        res.status(403).json({"error": err.message})
    }
}

module.exports = { register, login }