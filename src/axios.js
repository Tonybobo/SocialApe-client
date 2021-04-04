import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://asia-southeast2-socialape-9a836.cloudfunctions.net/api'
});

export default instance;
