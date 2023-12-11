import "./Search.css"

// Componentes
import LikeContainer from "../../components/LikeContainer"
import PhotoItem from "../../components/PhotoItem"
import { Link } from "react-router-dom"


// Hooks
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useResetCoponentMessage } from "../../hooks/useResetComponentMessage"
import { useQuery } from "../../hooks/useQuery"

// Redux 
import { searchPhotos, like } from "../../slices/photoSlice"


const Search = () => {
    const query = useQuery()
    const search = query.get("q")

    const dispatch = useDispatch()

    const resetMessage = new useResetCoponentMessage(dispatch)

    const { user } = useSelector(state => state.auth)
    const { photos, loading } = useSelector(state => state.photo)

    // Load photos
    useEffect(() => {
        dispatch(searchPhotos(search))
    }, [dispatch, search])

    // Like a Photo
    const handleLike = (photo) => {
        dispatch(like(photo._id));
        resetMessage();
      };
    
      if (loading) {
        return <p>Carregando...</p>;
      }

  return (
    <div>
        Search(search)
    </div>
  )
}

export default Search
