import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/todos/1';

export default function downloadFile() {
  axios.get('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.log(error)
  })
}
