import axios from "axios";
import { addressType } from "common";

const addAddressService = async(address:addressType)=>{


    try{
        return await axios.post(`/api/v1/address/newaddress`,{address},
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

export default addAddressService;