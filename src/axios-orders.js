import axios from 'axios';

const instance = axios.create();

instance.defaults.baseURL = 'https://mytest-e3421-default-rtdb.firebaseio.com/';

export default instance;