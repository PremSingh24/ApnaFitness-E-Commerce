import axios from "axios";


const getAddressService = async()=>{


    try{
        return await axios.get("/api/v1/address/myaddress",
        {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
        );


    }catch(error){
        if (axios.isAxiosError(error)) {
            if (error && error.response) {
              return error.response.data;
            }
        }

        return {message:"Something Went Wrong"};
    }
    

}

export default getAddressService;