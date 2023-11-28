const Photo = require("../models/Photo")
const User = require("../models/User")

const mongoose = require("mongoose")


//Insert a photo, with an user related do it
// Insert in PhotoRoutes
const insertPhoto = async (req, res) => {
    const { title } = req.body;
    const image = req.file.filename;
  
    //console.log('REQUSER', req._id);
  
    const reqUser = req.user;
    
    //console.log(req.body)
    //res.send("Photo Insert")

    const user = await User.findById(reqUser._id);

    console.log('REQNAME', user.name);

    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name ,
    })

    // If photo created sucessfully, return data
    if(!newPhoto){
        res.status(422).json({
            errors: ["Houve um problema, por favor tente novamete mais tarde."],
        })
        return 
    }
    res.status(201).json(newPhoto)
}

//Remove a Photo from DB
// Insert in PhotoRoutes
const deletePhoto = async(req, res) => {

    const { id }  = req.params
    const reqUser = req.user

    try {
        

    const photo = await Photo.findById(mongoose.Types.ObjectId(id))

    // Check if Phot exists
    if(!photo){
        res.status(404).json({
            errors: [
                "Foto nao encontrada."
            ]
        })
        return
    }

    //Ckeck if Photo belongs to user

    if(!photo.userId.equals(reqUser._id)){
        res.status(422).json({
            errors: [
                "Ocorreu um erro, por favor tente mais tarde."
            ]
        })
        return
    }

    await Photo.findByIdAndDelete(photo._id)
    res.status(200).json({
        id: photo._id,
        message: "Foto excluida com sucesso."      
    })
    console.log("Foto Excluída")

    } catch (error) {
        res.status(404).json({
            errors:[
                "Foto nao encontrada."
            ]   
        })
        return
      }
}

// Get All Photos
const getAllPhotos = async(req,res) => {

    const photos = await Photo.find({})
        .sort([["createdAt", -1]])
        .exec()


    return res.status(200).json(photos)

}

// Get User Photos

    const getUserPhotos = async(req,res) =>{

        const { id } = req.params
        const photos = await Photo.find({ userId: id })
            .sort([["createdAt", -1]])
            .exec()

        return res.status(200).json(photos)
    }
// Get Phoyo by ID 

    const getPhotoById = async(req,res) => {

        const { id } = req.params
        const photo = await Photo.findById( mongoose.Types.ObjectId( id ) )

        // Check Photo Exists
        if(!photo){
            res.status(404).json({
                errors: [
                    "Foto nao encontrada."
                ]
            })
            return
        }      
        res.status(200).json(photo)

    }

    // Update a Photo
    const updatePhoto = async(req,res) => {

        const { id } = req.params
        const { title } = req.body
        //atualizamos somente o title nao a foto

        const reqUser = req.user

        const photo = await Photo.findById(id)

        // Check Photo Exists
        if(!photo){
            res.status(404).json({
                errors: [
                    "Foto nao encontrada."
                ]
            })
            return
        }     

        // Check if photo belongs to user
        if(!photo.userId.equals(reqUser._id)) {
            res.status(422).json({
                errors: [ "Ocorreu um erro, por favor tente novamente mais tarde." ]
            })
            return
        }

        if(title){
            photo.title = title
        }

        await photo.save()
        res.status(200).json({
            photo,
            message: "Foto Atualizada com sucesso"
        })
    }

    // Like functionality
    const likePhoto = async(req,res) => {
        const { id } = req.params
      
        const reqUser = req.user

        const photo = await Photo.findById(id)

        // Check Photo Exists
        if(!photo){
            res.status(404).json({
                errors: [
                    "Foto nao encontrada."
                ]
            })
            return
        }     

        // Check if user already liked photo    
        if(photo.likes.includes(reqUser._id)) {
            res.status(422).json({
                errors: [
                    "Voce já curtiu a foto."
                ]
            })
            return
        }

        //Put user id in likes array
        photo.likes.push(reqUser._id)

        photo.save()

        res.status(200).json({
            photoid: id,
            userId: reqUser._id,
            message: "A foto foi curtida."
        })
    }

    // Comment Funcionality
    const commentPhoto = async(req,res) => {

        const { id } = req.params
        const { comment } = req.body
        //atualizamos somente o title nao a foto

        const reqUser = req.user

        const user = await User.findById(reqUser._id)

        const photo = await Photo.findById(id)

        // Check Photo Exists
        if(!photo){
            res.status(404).json({
                errors: [
                    "Foto nao encontrada."
                ]
            })
            return
        }  

        // Put comment in the Array comments
        const userComment = {
            comment,
            userName: user.name,
            userImage: user.profileImage,
            userId: user._id
        }

        photo.comments.push(userComment)
        photo.save()

        res.status(200).json({
            comment: userComment,
            message: "O comentário foi incluido com sucesso"
        })
    }

    // Search photos by title
    const searchPhotos = async(req,res) => {

        const { q } = req.query

        const photos = await Photo.find({
            title: new RegExp(q, "i")
        })
        .exec()

        res.status(200).json(photos)

    }

module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    updatePhoto,
    likePhoto,
    commentPhoto,
    searchPhotos,
}

