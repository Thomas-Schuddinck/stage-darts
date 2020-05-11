import axios from 'axios';

export const GetApiCall = async (url: string): Promise<any> => {
   return axios.get(url).then(function (response: any) {

      return response.data;

   }).catch((err) => {
      console.log(err);
   })
}

export const PostApiCall = async (url: string, body: any): Promise<any> => {
   const config = { headers: {'Content-Type': 'application/json'} };
   return axios.post(url, body , config )
      .then((response) => {
        console.log(response);
        console.log(body);
        return response.data.id;
      }, (error) => {
        console.log(error);
        console.log(body);
      });
}

export const PutApiCall = async (url: string): Promise<any> => {
   return axios.put(url).then(function (response: any) {

      return response.data;

   }).catch((err) => {
      console.log(err);
   })
}

