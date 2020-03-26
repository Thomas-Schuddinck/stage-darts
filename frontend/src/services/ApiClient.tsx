import axios from 'axios';

export const GetApiCall = async (url: string): Promise<any> => {
   return axios.get(url).then(function (response: any) {

      return response.data;

   }).catch((err) => {
      console.log(err);
   })
}

export const PostApiCall = async (url: string, body: any): Promise<any> => {
   return axios.post(url, body )
      .then((response) => {
        console.log(response);
        return response.data.id;
      }, (error) => {
        console.log(error);
      });
}

export const PutApiCall = async (url: string): Promise<any> => {
   return axios.put(url).then(function (response: any) {

      return response.data;

   }).catch((err) => {
      console.log(err);
   })
}

