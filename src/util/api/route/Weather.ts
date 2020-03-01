import axios from 'axios';
import { baseUrl } from '..';

axios.defaults.withCredentials = true;

const endpoint = `${baseUrl}/weather`;

const Weather = {
  getWeather: async headers => {
    try {
      const response = await axios.get(`${endpoint}`, headers);
      return response;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  },
};

export default Weather;
