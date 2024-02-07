import axios from "axios";


const addToWishlistService = async(ProductId:any)=>{


    try{
        return await axios.post(`/api/v1/wishlist/${ProductId}`,{},
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

export default addToWishlistService;