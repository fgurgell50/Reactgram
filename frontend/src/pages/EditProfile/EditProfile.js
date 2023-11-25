import './EditProfile.css'

import { uploads } from '../../utils/config'

// Hooks
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Components
import Message from '../../components/Message'
import { updateProfile, profile, resetMessage } from '../../slices/userSlice'

const EditProfile = () => {

    const dispatch = useDispatch()

    const { user, message, error, loading } = useSelector((state) => state.user )

    // states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [bio, setBio] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    // Load User data
    useEffect(() => {
        dispatch(profile())
    }, [dispatch])

    //console.log(user)

    // Fill form user data
    useEffect(() => {
        if(user){
            setName(user.name)
            setEmail(user.email)
            setBio(user.bio)
        }
    }, [user])


    const handleSubmit = async (e) => {
        e.preventDefault()

         // Gather user data from states
            const userData = {
                name,
            };
        
            if (profileImage) {
                userData.profileImage = profileImage;
            }
        
            if (bio) {
                userData.bio = bio;
            }
        
            if (password) {
                userData.password = password;
            }
        
            // build form data
            const formData = new FormData();


        // fazer um loop em todas as chaves q vao ser enviadas
        const userFormData = Object.keys(userData).forEach((key) =>
        formData.append(key, userData[key])
      );

        formData.append("user", userFormData);
        await dispatch(updateProfile(formData));
        

        // tempo de 2000 misegundos para sumir a msg de sucesso
        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)

    }

    const handleFile = (e) => { 
        //image preview
        const image = e.target.files[0]
        setPreviewImage(image)

        // update image state
        setProfileImage(image)

    }

  return (
    <div id="edit-profile">
        <h2>Edite seus dados</h2>
        <p className="subtitle" >Adicione uma imagem de perfil e conte mais sobre voce</p>
        {/* preview da imagem*/}
        {(user.profileImage || previewImage) && (
        <img
          className="profile-image"
          src={
            previewImage
              ? URL.createObjectURL(previewImage)
              : `${uploads}/users/${user.profileImage}`
          }
          alt={user.name}
        />
        )}
        <form onSubmit={handleSubmit}>
            <input 
                type='text'
                placeholder='Nome'
                onChange={(e) => setName(e.target.value)}
                value={name || ""}
            />
            <input 
                type='email'
                placeholder='Email'
                disabled
                onChange={(e) => setEmail(e.target.value)}
                value={email || ""}
            />
            <label>
                <span>Imagem do Perfil</span>
                <input 
                    type='file' 
                    onChange={handleFile}
                />
            </label>
            <label>
                <span>Bio:</span>
                <input 
                    type='text' 
                    placeholder='Descricao do Perfil'
                    onChange={(e) => setBio(e.target.value)}
                    value={bio || ""}
                />
            </label>
            <label>
                <span>Quer altera sua senha?</span>
                <input typeof='password' 
                    placeholder='Digite sua nova senha'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password || ""}
                />
            </label>
            {!loading && <input type="submit" value="Atualizar" />}
            {loading && <input type="submit" disabled value="Aguarde..." />}
            {error && <Message msg={error} type="error" />}
            {message && <Message msg={message} type="success" />}
        </form>
    </div>
  )
}

export default EditProfile
