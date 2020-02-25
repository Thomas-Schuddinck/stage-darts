import axios from 'axios';

const url = 'http://localhost:5000/Player';

export const playerService = {
  get,
  // post,
  // put,
  // deleteDetail
};

function get() {
  return axios.get('http://localhost:5000/Player/')
  .then(response => {
    console.log(response.data.name)
  })
  .catch(error => {
    console.log(error)
  })
}
