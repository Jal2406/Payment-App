const express = require('express')
const router = express.Router();
const zod = require('zod')
const jwt = require('jsonwebtoken')
const { User, Account } = require('../DB');
const {JWT_SECRET} = require('../config');
const { authMiddleware } = require('../middleware/userMiddle');

const signupSchema = zod.object({
    email: zod.string().email(),
    fName: zod.string().min(3).max(50),
    lName: zod.string().min(3).max(50),
    password: zod.string().min(6)
})

const updateBody = zod.object({
    password: zod.string().min(6).optional(),
    fName: zod.string().min(3).max(50).optional(),
    lName: zod.string().min(3).max(50).optional()
})

const signinBody = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6)
})

router.post('/signup', async (req, res) =>{
    const body = req.body;
    const isOK = signupSchema.safeParse({
        email:body.email,
        fName:body.fname,
        lName:body.lname,
        password:body.password
    });

    const isUser = await User.findOne({
        email: body.email
    })
    console.log(body)
    if(isUser){
        return res.json({
            message:'User already Exist'
        })
    }
    if (!isOK.success) {
        return res.json({
            message: 'Incorrect Inputs'
        })
    }
    const user = await User.create(body)

    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random()*10000 // Including Random Balance(Bank API will come here)
    })

    const token = jwt.sign({
        userId: user._id
    }, JWT_SECRET)

    return res.status(200).json({
        message:'User Created',
        token: token
    })
})

router.post('/signin', async(req, res) => {
    const {success} = signinBody.safeParse({
        email:req.body.email,
        password:req.body.password
    })

    const user = await User.findOne({
        email:req.body.email
    })
    if (success) {
        if (user){
            if (user.password === req.body.password) {
                const token = jwt.sign({userId:user._id},JWT_SECRET)
                res.json({
                    token:token
                })
                return;
            }
            else{
                res.status(403).json({message:"Invailid Password"})
                return;
            }
        }
        res.json({message:"User not exist"})
        return;
    }
    else{
        res.json({
            message:"Enter Valid Input"
        })
        return;
    }
})


router.put('/', authMiddleware, async (req, res) => {
    const body = req.body;
    const {success} = updateBody.safeParse(body)

    if (!success) {
        return res.json({
            message: 'Something went wrong'
        })
    }
    await User.updateOne(req.body,{
        id: req.userId
    })
    res.json({
        message:'Update Successfully'
    })
})

router.get('/bulk', async(req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            fname:{
                '$regex':filter,
                '$options': 'i'
            }
        }, {
            lname:{
                '$regex':filter,
                '$options': 'i'
            }
        }]
    })

    res.status(200).json({
        user: users.map(user => ({
                email: user.email,
                fname: user.fname,
                lname:user.lname,
                _id:user._id
        }))
    })
}) 

module.exports = router;

