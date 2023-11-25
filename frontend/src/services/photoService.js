import { json } from "react-router-dom";
import { api, requestConfig } from "../utils/config";

// Publish and user photo
// funcao estrita para quem está logado , por isso o Token
const publishPhoto = async(data, token) => {

    const config = requestConfig("POST", data, token, true)
    // tem img por isso true

    try {
        
        const res = await fetch(api + "/photos", config)
            .then((res) => res.json())
            .catch((err) => err)

        return res

    } catch (error) {
        console.log(error)
    }
}

// Get User Photos
const getUserPhotos = async(id, token) =>{

    const config = requestConfig("GET", null, token)

    try {
        
        const res = await fetch(api + "/photos/user/" + id, config)
                    .then((res) => res.json())
                    .catch((err) => err)           
       
        return res
    } catch (error) {
        console.log(error)
    }
}

// Delete Photo
const deletePhoto = async(id, token) =>{

    const config = requestConfig("DELETE", null, token)

    try {
        
        const res = await fetch(api + "/photos/" + id, config)
                    .then((res) => res.json())
                    .catch((err) => err)           
      
        return res
    } catch (error) {
        console.log(error)
    }
}

// Update a Photo
const updatePhoto = async(data, id, token) =>{

    const config = requestConfig("PUT", data, token)

    try {
        
        const res = await fetch(api + "/photos/" + id, config)
                    .then((res) => res.json())
                    .catch((err) => err)           
   
        return res
    } catch (error) {
        console.log(error)
    }
}

// Get a Photo By ID
const getPhoto = async(id, token) =>{

    const config = requestConfig("GET", null, token)

    try {
        
        const res = await fetch(api + "/photos/" + id, config)
                    .then((res) => res.json())
                    .catch((err) => err)           
   
        return res
    } catch (error) {
        console.log(error)
    }
}

// Like a Photo
const like = async(id, token) =>{

    const config = requestConfig("PUT", null, token)

    try {
        
        const res = await fetch(api + "/photos/like/" + id, config)
                    .then((res) => res.json())
                    .catch((err) => err)           
   
        return res
    } catch (error) {
        console.log(error)
    }
}


const photoService = {
    publishPhoto,
    getUserPhotos,
    deletePhoto,
    updatePhoto,
    getPhoto,
    like,
}

export default photoService