import axios from "axios";


const getCartService = async()=>{


    try{
        return await axios.get("/api/v1/cart/mycart",
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

export default getCartService;