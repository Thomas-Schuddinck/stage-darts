import axios from 'axios';

const url = 'http://localhost:5000/Player';

const GetApiCall = async (url: string): Promise<any> => {
  return axios.get(url).then(function(response: any) {

     return response.data;

  }).catch((err)=>{
     console.log(err);
  })
}

export default GetApiCall