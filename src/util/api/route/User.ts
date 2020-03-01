import axios from 'axios';
import { baseUrl } from '..';
import { formDataMaker } from '../../helper';

axios.defaults.withCredentials = true;

const endpoint = `${baseUrl}/user`;

const User = {
  getProfile: async (userId, headers) => {
    try {
      const response = await axios.get(`${endpoint}/${userId}`, headers);
      return response;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  },
  editProfile: async (isImageDeleted, image, bodyData, headers) => {
    const body = formDataMaker(image, bodyData);
    try {
      const response = axios.patch(
        `${endpoint}?img-del=${isImageDeleted}`,
        body,
        headers,
      );
      return response;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  },
  deleteUser: (headers) => {
    // 마지막에 테스트
    return axios.delete(endpoint, headers);
  },
  getPlants: async (headers) => {
    try {
      const response = await axios.get(`${endpoint}/plants`, headers);
      return response;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  },
};

export default User;
