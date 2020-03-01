import axios from 'axios';
import { baseUrl } from '..';

axios.defaults.withCredentials = true;

const endpoint = `${baseUrl}/plantsdb`;

const PlantsDB = {
  searchPlant: (query, headers) => {
    return axios
      .get(`${endpoint}/search?q=${query}`, headers)
      .then(res => {
        return res;
      })
      .catch(err => {
        return err.message;
      });
  },
  getPlantData: (plantsDBId, headers) => {
    return axios
      .get(`${endpoint}/${plantsDBId}`, headers)
      .then(res => {
        return res;
      })
      .catch(err => {
        return err.message;
      });
  },
};

export default PlantsDB;
