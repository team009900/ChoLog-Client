import axios from 'axios';
import { baseUrl } from '..';
import { formDataMaker } from '../../helper';

axios.defaults.withCredentials = true;

const endpoint = `${baseUrl}/diary`;

const Diary = {
  newDiary: async (plantId, image, bodyData, headers) => {
    const body = formDataMaker(image, bodyData);
    try {
      const response = await axios.post(
        `${endpoint}/${plantId}`,
        body,
        headers,
      );
      return response;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  },
  getDiary: async (diaryId, headers) => {
    try {
      const response = await axios.get(`${endpoint}/${diaryId}`, headers);
      return response;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  },
  editDiary: async (isImageDeleted, diaryId, image, bodyData, headers) => {
    const body = formDataMaker(image, bodyData);
    try {
      const response = await axios.patch(
        `${endpoint}/${diaryId}?img-del=${isImageDeleted}`,
        body,
        headers,
      );
      return response;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  },
  deleteDiary: async (diaryId, headers) => {
    try {
      const response = await axios.delete(`${endpoint}/${diaryId}`, headers);
      return response;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  },
};

export default Diary;
