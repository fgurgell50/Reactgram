import "./Profile.css"

import { uploads } from "../../utils/config"

// components
import Message from "../../components/Message"
import { Link } from "react-router-dom"
import { BsFillEyeFill, BsPencilFill, BsXLg} from "react-icons/bs"
// BsFillEyeFill ícone para ver a fotos
// BsPencilFill para editar as fotos
// BsXLg para deletar fotos

// Hooks
import { useEffect, useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

// redux 
import { getUserDetails } from "../../slices/userSlice"
import { 
  publishPhoto, 
  resetMessage, 
  getUserPhotos, 
  deletePhoto, 
  updatePhoto, 
} from "../../slices/photoSlice"

const Profile = () => {

    const { id } = useParams()
    const dispatch = useDispatch()

    //usuário q entrei no perfil dele
    const { user, loading } = useSelector((state) => state.user )
    //usuário autenticado
    const { user: userAuth } = useSelector((state) => state.auth)

    const { 
      photos, 
      loading: loadingPhoto, 
      message: messagePhoto, 
      error: errorPhoto 
    } = useSelector((state) => state.photo)

    // State para inclusao
    const [ title, setTitle ] = useState("")
    const [ image, setImage ] = useState("")

    // State de Edicao
    const [ editId, setEditId] = useState("")
    const [ editImage, setEditImage ] = useState("")
    const [ editTitle, setEditTitle ] = useState("")

    // New Form and Edit frm refs
    const newPhotoForm = useRef()
    const editPhotoForm = useRef()

    // Load User Data
   useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id))
  }, [dispatch, id]);


  const handleFile = (e) => { 
    //image preview
    const image = e.target.files[0]
    setImage(image)

}

  const resetComponentMessage = () => {
  // tempo de 2000 misegundos para sumir a msg de sucesso
  setTimeout(() => {
    dispatch(resetMessage())
  }, 2000)
}

  const submitHandle = async(e) =>{
    e.preventDefault()

    const photoData = {
      title,
      image
    }

    //build for data
    const formData = new FormData()

    // fazer um loop em todas as chaves q vao ser enviadas
    const photoFormData = Object.keys(photoData).forEach( (key) =>
    formData.append( key, photoData[key] )
    )
    formData.append("photo", photoFormData);
    await dispatch(publishPhoto(formData));

    setTitle("")
    resetComponentMessage()
  }
    
  // Show or hide forms
  function hideOrShowForms() {
    // se estiver oculto vai mostrar e vice versa
    newPhotoForm.current.classList.toggle("hide");
    editPhotoForm.current.classList.toggle("hide");
  }

  // Delete a Photo
  const handleDelete = (id) => {
    dispatch(deletePhoto(id))
    resetComponentMessage()
  }

    // Show edit form
    const handleEdit = (photo) => {
      if (editPhotoForm.current.classList.contains("hide")) {
        hideOrShowForms();
      }
  
      setEditId(photo._id);
      setEditImage(photo.image);
      setEditTitle(photo.title);
    };
  
    // Cancel editing
    const handleCancelEdit = () => {
      hideOrShowForms();
    };
  
    // Update photo title
    const handleUpdate = (e) => {
      e.preventDefault();
  
      const photoData = {
        title: editTitle,
        id: editId,
      };
  
      dispatch(updatePhoto(photoData));
  
      resetComponentMessage();
    };
  

  if(loading) {
    return <p>Carregando...</p>
  }

  return (
    <div id = "profile">
      <div className="profile-header">
        {user.profileImage && (
            <img 
                src ={`${uploads}/users/${user.profileImage}`}
                alt={user.name}
            />
        )}
        <div className="profile-description">
            <h2>{user.name}</h2>
            <p>{user.bio}</p>
        </div>
      </div>
      { id === userAuth._id && (
        <>
          <div className="new-photo" ref={newPhotoForm}>
            <h3>Compartilhe algum momento seu:</h3>
            <form onSubmit={submitHandle}>
              <label>
                <span>Título para a foto:</span>
                <input 
                  type="text" 
                  placeholder="Insira um título"
                  onChange={(e)=> setTitle(e.target.value)}
                  value={title || ""}
                />
              </label>
              <label>
                <span>Imagem:</span>
                <input 
                  type="file"
                  onChange={handleFile}
                />
              </label>
              {!loadingPhoto && 
                <input type="submit" value="Postar"/>
              }
              {loadingPhoto && 
                <input type="submit" disabled value="Aguarde..."/>
                }
            </form>
          </div>
          {/* COMECA EDIT PHOTO*/}
          <div className="edit-photo hide" ref={editPhotoForm}>
            <p>Editando:</p>
            {editImage && (
              <img 
                src={`${uploads}/photos/${editImage}`} 
                alt={editTitle}
              />
            )}
            <form onSubmit={handleUpdate}>
                <input 
                  type="text" 
                  placeholder="Insira novo título"
                  onChange={(e)=> setEditTitle(e.target.value)}
                  value={editTitle || ""}
                />
                <input type="submit"  value="Atualizar"/>
                <button className="cancel-btn" onClick={handleCancelEdit}>Cancelar Edição</button>
            </form>
          </div>
          {errorPhoto && <Message msg={errorPhoto} type="error" />}
          {messagePhoto && <Message msg={messagePhoto} type="success" />  }
        </>
      ) }
      <div className="user-photos">
                <h2>Fotos Publicadas</h2>
                <div className="photos-container">
                  {photos && 
                    photos.map((photo) => (
                      <div className="photo" key={photo._id}>
                      {photo.image && (
                        <img 
                          src={`${uploads}/photos/${photo.image}`} 
                          alt={photo.title} 
                        /> 
                      )}
                      {id === userAuth._id ? (
                        <div className="actions">
                          <Link to={`/photos/${photo._id}`}>
                            <BsFillEyeFill />
                          </Link>
                            <BsPencilFill 
                              onClick={() => {
                                handleEdit(photo)
                              }}
                            />
                            <BsXLg 
                              onClick={() => (
                                handleDelete(photo._id)
                              )}
                            />
                          </div>
                        ) : (
                          <Link className="btn" to={`/photos/${photo._id}`}>
                            Ver
                          </Link>
                      )}
                    </div>          
                  ))}
                  { photos.length === 0 && <p>Ainda não há fotos publicadas</p> }
                </div>
      </div>
    </div>
  )
}

export default Profile
