import axios from "axios";


const removeFromCartService = async(CartId:any)=>{


    try{
        return await axios.delete(`/api/v1/cart/${CartId}`,
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

export default removeFromCartService;