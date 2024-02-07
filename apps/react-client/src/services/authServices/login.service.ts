import axios from "axios";
import {loginUserType} from "common"

const loginService = async(registerUser:loginUserType)=>{

    try{
        return await axios.post("/api/v1/auth/login", registerUser);

         

    }catch(error){

        if (axios.isAxiosError(error)) {
            if (error && error.response) {
                return error.response.data;
            }
        }

        return { message: "Something Went Wrong!" };
    }

}

export default loginService;