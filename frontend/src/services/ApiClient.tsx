import axios from 'axios';

export const GetApiCall = async (url: string): Promise<any> => {
   return axios.get(url).then(function (response: any) {

      return response.data;

   }).catch((err) => {
      console.log(err);
   })
}

export const PostApiCall = (url: string, body: any): Promise<any> => {
   return axios.post(url, { body })
      .then(res => {
         console.log(res);
         console.log(res.data);
      })
}

