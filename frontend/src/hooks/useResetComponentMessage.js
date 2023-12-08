// Redux
import { resetMessage } from "../slices/photoSlice";

export const useResetCoponentMessage  = (dispatch) => {
    return () => {
        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)
    }
}