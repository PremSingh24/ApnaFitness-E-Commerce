import axios from "axios";
import {registerUserType} from "common"



export const registerUserService = async(userData:registerUserType)=>{

    try{
        const response = await axios.post("/api/v1/auth/register", 
        userData
        );

        return response;

    }catch(error){

        if (axios.isAxiosError(error)) {
            if (error && error.response) {
                return error.response.data
            }
        }

        return { message: "Something Went Wrong!" };
    }

}