import axios from 'axios';

export const MyAxiosRequest = async ()=> {

const response = await axios ({
    method: 'post',
    url:'https://jsonplaceholder.typicode.com/posts',
});

return response;

}
