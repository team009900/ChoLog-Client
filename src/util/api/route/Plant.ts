import axios from 'axios';
import { baseUrl } from '..';
import { formDataMaker } from '../../helper';

axios.defaults.withCredentials = true;

const endpoint = `${baseUrl}/plant`;

const Plant = {
  addPlant: async (image, bodyData, headers) => {
    const body = formDataMaker(image, bodyData);
    try {
      const response = await axios.post(endpoint, body, headers);
      return response;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  },
  getPlantData: async (plantId, headers) => {
    try {
      const response = await axios.get(`${endpoint}/${plantId}`, headers);
      response.data.adoptionDate = response.data.adoptionDate.slice(0, 10);
      return response;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  },
  editPlant: async (isImageDeleted, plantId, image, bodyData, headers) => {
    const body = formDataMaker(image, bodyData);
    try {
      const response = await axios.patch(
        `${endpoint}/${plantId}?img-del=${isImageDeleted}`,
        body,
        headers,
      );
      return response;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  },
  deletePlant: async (plantId, headers) => {
    try {
      const response = await axios.delete(`${endpoint}/${plantId}`, headers);
      return response;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  },
  getDiaryList: async (plantId, year, month, headers) => {
    try {
      const response = await axios.get(
        `${endpoint}/diaries?id=${plantId}&year=${year}&month=${month}`,
        headers,
      );
      return response;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  },
};

export default Plant;
