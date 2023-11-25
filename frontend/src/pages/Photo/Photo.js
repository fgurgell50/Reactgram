import "./Photo.css"

import { uploads } from "../../utils/config"

// Components
import Message from "../../components/Message"
import { Link } from "react-router-dom"
import PhotoItem from "../../components/PhotoItem"
import LikeContainer from "../../components/LikeContainer"

// Hooks
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

// Redux 
import { getPhoto, like } from "../../slices/photoSlice"



const Photo = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth ) 
    const { photo, loading, error, message } = useSelector((state) => state.photo )

    // Comentários

    // Load photo data
    useEffect(() => {
        dispatch(getPhoto(id))
    }, [dispatch, id])
    //entrando na página a Photo é carregada

    const handleLike = () => {
        dispatch(like(photo._id))
    }

    if(loading) {
        return <p>Carregando...</p>
      }
    

  return (
    <div id="photo">
      <PhotoItem photo={photo} />
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
      <div className="message-container">
        { error &&  <Message  msg={error}  type="error"/> }
        { message &&  <Message  msg={message}  type="success"/> }
      </div>
    </div>
  )
}

export default Photo
