import axios from "axios";


const updateCartService = async(CartId:any,quantity:number)=>{


    try{
        return await axios.put(`/api/v1/cart/${CartId}`,{quantity},
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

export default updateCartService;