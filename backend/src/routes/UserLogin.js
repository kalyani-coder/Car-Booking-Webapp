

const express = require('express')
const router = express.Router()
const UserSchema = require('../models/UserModels')



// router.post('/', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const user = await UserSchema.findOne({ email });
//         if (!user)
//             return res.status(200).send({ message: "Invalid username or password" });

//         const validPassword = password === user.password;
//         if (!validPassword)
//             return res.status(200).send({ message: "Invalid username or password" });

//         req.session.userId = user._id;

//         res.send({ message: "success", id: user._id }).status(200);

//     } catch (e) {
//         res.status(404).json({ message: "Internal server Error ", e })
//     }
// })

// router.get('/' , async(req, res) => {
//     try{
//         if (req.session.userId) {
//             res.send({ loggedIn: true, userId: req.session.userId,  });
//           } else {
//             res.send({ loggedIn: false });
//           }
//     }catch(e){
//         res.status(404).json({message : "Error" , e})
//     }
// })


router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserSchema.findOne({ email });
        if (!user)
            return res.status(200).send({ message: "Invalid username or password" });

        const validPassword = password === user.password;
        if (!validPassword)
            return res.status(200).send({ message: "Invalid username or password" });

        req.session.regenerate(err => {
            if (err) {
                return res.status(500).json({ message: "Internal server Error", err });
            }

            req.session.userId = user._id;
            res.send({ message: "success", id: user._id, email: user.email }).status(200);
        });

    } catch (e) {
        res.status(404).json({ message: "Internal server Error ", e })
    }
});


router.get('/', async (req, res) => {
    try {
        if (req.session.userId) {
            const user = await UserSchema.findById(req.session.userId);
            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }
            res.send({ loggedIn: true, userId: req.session.userId, email: user.email });
        } else {
            res.send({ loggedIn: false });
        }
    } catch (e) {
        res.status(500).json({ message: "Internal server Error", e });
    }
});


router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: "Internal server Error", err });
        }

        // Clear cookie
        res.clearCookie('sid');

        res.send({ message: "Logged out successfully" }).status(200);
    });
});



module.exports = router