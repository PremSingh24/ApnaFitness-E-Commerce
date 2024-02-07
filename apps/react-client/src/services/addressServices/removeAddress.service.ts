import axios from "axios";

const removeAddressService = async(AddressId:any)=>{


    try{
        return await axios.delete(`/api/v1/address/${AddressId}`,
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

export default removeAddressService;