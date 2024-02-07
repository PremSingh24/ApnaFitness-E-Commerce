import axios from "axios";


const authenticateService = async()=>{

    try{
        return await axios.get("/api/v1/auth/authenticate",
        {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
        );

        

    }catch(error){

        if (axios.isAxiosError(error)) {
            if (error && error.response) {
                return error.response.data;
            }
        }

        return { message: "Something Went Wrong!" };
    }

}

export default authenticateService;