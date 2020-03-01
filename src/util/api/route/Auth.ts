import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { baseUrl } from '..';

axios.defaults.withCredentials = true;

const setToken = async res => {
  try {
    await AsyncStorage.setItem(
      'token',
      res.headers['set-cookie'][0].split(';')[0].slice(6),
    );
  } catch (e) {
    // save error
  }
  console.log('쿠키 저장 성공');
};

const setUserId = async res => {
  try {
    console.log('아이디 들어오나', res.data.id);
    await AsyncStorage.setItem('userId', String(res.data.id));
  } catch (e) {
    // save error
  }
  console.log('userId 저장 성공');
};

const removeTokenId = async () => {
  try {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userId');
  } catch (e) {
    // remove error
  }

  console.log('Done.');
};

const Auth = {
  login: body => {
    return axios
      .post(`${baseUrl}/auth/login`, body)
      .then(async res => {
        console.log('로그인성공');
        await setToken(res);
        return res;
      })
      .then(async res => {
        await setUserId(res);
        return res;
      })
      .catch(err => {
        console.log('로그인실패');
        return err.message;
      });
  },
  signup: body => {
    return axios
      .post(`${baseUrl}/auth/signup`, body)
      .then(res => {
        console.log('회원가입 성공', res.status);
        return res.status;
      })
      .catch(err => {
        console.log('회원가입실패', err.message);
        return err.message;
      });
  },
  logout: headers => {
    console.log('로그아웃헤더', headers);
    return axios
      .post(`${baseUrl}/auth/logout`, null, headers)
      .then(res => {
        console.log('로그아웃 성공');
        removeTokenId();
        return res;
      })
      .catch(err => {
        console.log('로그아웃 실패');
        return err.message;
      });
  },
  checkIdDuplication: id => {
    if (id) {
      return axios
        .get(`${baseUrl}/auth/${id}`)
        .then(res => {
          return res.status;
        })
        .catch(err => {
          console.log('닉네임중복에러', err);
        });
    }
  },
};

export default Auth;
