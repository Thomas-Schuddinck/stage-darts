import axios from 'axios';

const url = 'http://localhost:5000/Player';

export const playerService = {
  get: getApi,
  // post,
  // put,
  // delete
};

async function getApi(){
  return axios.get('http://localhost:5000/Player/1').then((response)=>{
    console.log(response.data.name);
     return response;
  }).catch((err)=>{
     console.log(err);
  })
}

const ApiGetCallAxios = async (url: string): Promise<any> => {
  axios.get(url).then(function(response: any) {
    // handle success
    console.log("in api client");
    console.log(response.data);
    return response.data;
  });
};
