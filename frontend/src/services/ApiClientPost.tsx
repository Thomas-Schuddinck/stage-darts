import axios from 'axios';


const PostApiCall = async (url: string, value: string): Promise<any> => {
  return axios.post(url, {
    Id: '1',
    Value: value
  })
  .then((response) => {
    console.log(response);
  }, (error) => {
    console.log(error);
  });
}

export default PostApiCall