import axios from 'axios';


const GetApiCall = async (url: string): Promise<any> => {
  return axios.get(url).then(function(response: any) {

     return response.data;

  }).catch((err)=>{
     console.log(err);
  })
}

export default GetApiCall