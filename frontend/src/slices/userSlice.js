import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";
import userService from "../services/useService";

const user = JSON.parse( localStorage.getItem("user") )

const initialState = {
    user: {},
    error: false,
    success: false,
    loading: false,
    message: null
}


// Get user details
export const profile = createAsyncThunk(
    "user/profile",
    async(user, thunkAPI) => {

        const token = thunkAPI.getState().auth.user.token
        // pegando a info no authSlice initialState

        const data = await userService.profile(user, token)

        return data
    }
)

// Update User Details
export const updateProfile = createAsyncThunk(
    "user/update",
    async(user, thunkAPI) => {

        const token = thunkAPI.getState().auth.user.token

        const data = await userService.updateProfile(user, token)

        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data

    }
)

// Get User Details
export const getUserDetails = createAsyncThunk(
    "user/get",
    async(id, thunkAPI) =>{
        const data = await userService.getUserDetails(id)
        return data
    }
)


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(profile.pending, (state) => {
            state.loading = true
            state.error= false
        })
        .addCase( profile.fulfilled, (state, action) => {
            //action pegar data q está sendo enviado da requisicao e enviado para a API
            state.loading= false
            state.success= true
            state.error= null
            state.user= action.payload
        })
        .addCase(updateProfile.pending, (state) => {
            state.loading = true
            state.error= false
        })
        .addCase( updateProfile.fulfilled, (state, action) => {
            //action pegar data q está sendo enviado da requisicao e enviado para a API
            state.loading= false
            state.success= true
            state.error= null
            state.user= action.payload
            state.message = "Usuário atualizado com sucesso"
        })
        .addCase(updateProfile.rejected, (state, action) => {
             // está sendo acionado em check errors
             console.log(state, action)
             state.loading = false
             state.error= action.payload
             state.user= {}
        })
        .addCase(getUserDetails.pending, (state) => {
            state.loading = true
            state.error= false
        })
        .addCase( getUserDetails.fulfilled, (state, action) => {
            //action pegar data q está sendo enviado da requisicao e enviado para a API
            state.loading= false
            state.success= true
            state.error= null
            state.user= action.payload
        })
    },
})

export const { resetMessage } = userSlice.actions
export default userSlice.reducer 