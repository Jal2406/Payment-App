 const express = require('express');
const { authMiddleware } = require('../middleware/userMiddle');
const { Account } = require('../DB');
const { default: mongoose } = require('mongoose');
 const router = express.Router();

router.get('/balance', authMiddleware, async (req, res) => {
    const acc = await Account.findOne({
        userId: req.userId 
    })
    res.json({
        balance: acc.balance
    })
 })

router.post('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    console.log('Transaction Started...')
    const {amount, to} = req.body;
try{
    const account = await Account.findOne({
        userId: req.userId
    }).session(session)

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message:'Insufficient Balance'
        }) 
    }
    const toAccount = await Account.findOne({
        userId:to
    }).session(session)

    if (!toAccount) {
        session.abortTransaction();
        return res.status(400).json({
            message:'Account not exists'
        })
    }

    await Account.updateOne({userId:req.userId}, {$inc:{balance: -amount}}).session(session)
    await Account.updateOne({userId:to}, {$inc:{balance: amount}}).session(session)

    await session.commitTransaction();
    console.log('Transaction Committed...')
    return res.status(200).json({
        msg:"Transation Completed"
    }) 
    }catch(err){
        await session.abortTransaction();
        console.log('Transaction Aborted...')
        return res.status(500).send("Error Occured")
    }
    finally{
        session.endSession();
    }
 })


 
 module.exports = router;