import axios from "axios";


const addToCartService = async(ProductId:any)=>{


    try{
        return await axios.post(`/api/v1/cart/${ProductId}`,{},
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

export default addToCartService;