

const express = require('express')
const router = express.Router()
const UserSchema = require('../models/UserModels')


router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserSchema.findOne({ email });
        if (!user)
            return res.status(200).send({ message: "Invalid username or password" });

        const validPassword = password === user.password;
        if (!validPassword)
            return res.status(200).send({ message: "Invalid username or password" });

        req.session.userId = user._id;

        res.send({ message: "success", id: user._id }).status(200);

    } catch (e) {
        res.status(404).json({ message: "Internal server Error ", e })
    }
})

router.get('/' , async(req, res) => {
    try{
        if (req.session.userId) {
            res.send({ loggedIn: true, userId: req.session.userId });
          } else {
            res.send({ loggedIn: false });
          }
    }catch(e){
        res.status(404).json({message : "Error" , e})
    }
})

router.post('/logout', async (req, res) => {
    try {
        req.session.destroy((err) => {
            if(err) {
                return res.status(500).json({ message: "Error logging out" });
            }
            res.clearCookie('connect.sid'); // Clear the session cookie
            res.status(200).json({ message: "Logged out successfully" });
        });
    } catch (e) {
        res.status(500).json({ message: "Internal server Error", error: e });
    }
});


module.exports = router