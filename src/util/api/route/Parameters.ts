import axios from 'axios';
import { baseUrl, headers } from '..';

axios.defaults.withCredentials = true;

const endpoint = `${baseUrl}/parameters`;

const Parameters = {
  getAllParameters: async (headers) => {
    try {
      const response = await axios.get(endpoint, headers);
      return response;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  },
  setPlantParameters: async (plantId, array, headers) => {
    // body {parameters: [1,2,3...]}
    const body = { parameters: JSON.stringify(array) };
    try {
      const response = await axios.post(
        `${endpoint}/plant/${plantId}`,
        body,
        headers,
      );
      return response;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  },
  getPlantParameters: async (plantId, headers) => {
    try {
      const response = await axios.get(`${endpoint}/plant/${plantId}`, headers);
      return response;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  },
};

export default Parameters;
