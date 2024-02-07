import axios from "axios";


const getCategoryProductService = async(CategoryId:any)=>{


    try{
        const response = await axios.get(`/api/v1/category/${CategoryId}`);

          if(response.status==200){
            return response.data
            
          }

    }catch(error){

        return error;
    }
    

}

export default getCategoryProductService;