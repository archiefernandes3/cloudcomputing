const express = require('express')
const router = express.Router()

const Post = require('../models/Post')// .. for two levels up
const { text } = require('body-parser')

//1. POST (Create data C from CRUD)
router.post('/', async(req, res)=>{
    //console.log(req.body)
    const postData = new Post({//to extract data from body in postman posted by user to send to database
        user:req.body.user,// the last word should match the name of the fields of the databasse
        title:req.body.title,
        text:req.body.text,
        hashtag:req.body.hashtag,
        location:req.body.location,
        url:req.body.url
    })
    //try to insert data
    try{
        const postToSave = await postData.save() // post data to mondoDB
        res.send(postToSave)
    }catch(err){
        res.send({message:err})
    }
})

//2. GET 1 (Read all, R from CRUD)
router.get('/', async(req,res)=>{
    try{
        const getPosts = await Post.find() //can add this .limit(10) if we want to see just a sample of data
        res.send(getPosts)
    }catch(err){
        res.send({message:err})
    }
})

//2. GET 2 only by what user requests, e.g. ID (Read by ID, R from CRUD)
router.get('/:postid', async(req,res)=>{
    try{
        const getPostById = await Post.findById(req.params.postid)
        res.send(getPostById)
    }catch(err){
        res.send({message:err})
    }
})

//3. UPDATE (PATCH in postman) U in CRUD
router.patch('/:postId', async(req, res)=>{
    const postData = new Post({
    user:req.body.user,
    title:req.body.title,
    text:req.body.text,
    hashtag:req.body.hashtag,
    location:req.body.location,
    url:req.body.url
    })
    try{
        const updatePostById = await Post.updateOne(
            {_id:req.params.postId}, //find record that has the ID
            {$set:{ //set new data
                user:req.body.user,
                title:req.body.title,
                text:req.body.text,
                hashtag:req.body.hashtag,
                location:req.body.location,
                url:req.body.url
                }
            })
        res.send(updatePostById)
    }catch(err){
        res.send({message:err})
    }
})

//4. DELETE
router.delete('/:postId', async(req,res)=>{
    try{
        const deletePostById = await Post.deleteOne({_id:req.params.postId})
        res.send(deletePostById)
    }catch(err){
        res.send({message:err})
    }
})

module.exports = router