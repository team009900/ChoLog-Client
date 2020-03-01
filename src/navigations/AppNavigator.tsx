import React, {
  useState,
  useEffect,
  createContext,
  useReducer,
  useMemo,
  useContext,
} from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Avatar, IconButton, Colors, Title } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { Auth, Parameters } from '../util/api/route';
import theme from '../../theme';

import {
  MyInfo,
  MyInfoEdit,
  Setting,
  AddPlant,
  SelectParameters,
  SearchPlantData,
  MyPlantLog,
  MyPlantLogNew,
  MyPlantAlbum,
  MyPlantAlbumImage,
  MyPlantInfo,
  MyPlantInfoEdit,
  MyPlantManageLogs,
  MyPlants,
  Login,
  SearchIdPw,
  SignUp,
  Welcome,
  LoadingScreen,
} from '../screens';

interface TopTabParamList {
  MyPlantManageLogs: undefined;
  MyPlantInfo: undefined;
}

const TopTab = createMaterialTopTabNavigator();

const PlantTopTap = ({ navigation, route }) => {
  // route.params.plantName, route.params.plantId, route.params.parametersData
  const { plantId, parametersData } = route.params;
  const [plantData, setPlantData] = useState({
    plantName: route.params.plantName,
    plantImage: route.params.image,
  });

  navigation.setOptions({
    headerStyle: { elevation: 0 },
    headerTitle: () => (
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity style={{ marginRight: 8 }}>
          <Avatar.Image size={40} source={{ uri: plantData.plantImage }} />
        </TouchableOpacity>
        <Title>{plantData.plantName}</Title>
      </View>
    ),
    headerTitleAlign: 'center',
  });

  return (
    <TopTab.Navigator
      tabBarOptions={{
        indicatorStyle: { backgroundColor: theme.colors.primary },
      }}>
      <TopTab.Screen
        name="MyPlantManageLogs"
        component={MyPlantManageLogs}
        options={{ tabBarLabel: '관리 일지' }}
        initialParams={{
          plantId,
          parametersData,
        }}
      />
      <TopTab.Screen
        name="MyPlantInfo"
        component={MyPlantInfo}
        options={{ tabBarLabel: '식물 정보' }}
        initialParams={{
          plantId,
          parametersData,
          setPlantData,
        }}
      />
    </TopTab.Navigator>
  );
};

const Stack = createStackNavigator();

const MyPlantStack = () => {
  const [parametersData, setParametersData] = useState(null);
  const { headers } = useContext(TokenContext);

  useEffect(() => {
    async function getParameters() {
      const response = await Parameters.getAllParameters(headers);
      if (response.data && response.status === 200) {
        setParametersData(response.data);
      }
    }
    getParameters();
  }, [headers]);

  if (!parametersData) return null;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyPlants"
        component={MyPlants}
        options={{ headerShown: false }}
        initialParams={{ parametersData }}
      />
      <Stack.Screen
        name="MyPlantManageLogs"
        component={PlantTopTap}
        initialParams={{ parametersData }}
        // options={({ navigation, route }) => ({
        //   headerStyle: { elevation: 0 },
        //   headerTitle: () => (
        //     <View
        //       style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        //       <TouchableOpacity style={{ marginRight: 8 }}>
        //         <Avatar.Image size={40} source={{ uri: route.params.image }} />
        //       </TouchableOpacity>
        //       <Title>{route.params.plantName}</Title>
        //     </View>
        //   ),
        //   headerTitleAlign: 'center',
        // headerRight: () => (
        //   <Button
        //     icon="camera"
        //     mode="contained"
        //     onPress={() => navigation.navigate('MyPlantAlbum')}>
        //     앨범
        //   </Button>
        // ),
        // })}
      />
      <Stack.Screen name="MyPlantAlbum" component={MyPlantAlbum} />
      <Stack.Screen name="MyPlantAlbumImage" component={MyPlantAlbumImage} />
      <Stack.Screen
        name="MyPlantLog"
        component={MyPlantLog}
        options={({ route }) => ({
          headerTitle: route.params.title,
          headerTitleAlign: 'center',
        })}
      />
    </Stack.Navigator>
  );
};

const MyInfoStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyInfo"
        component={MyInfo}
        options={{
          headerTitle: '내 정보',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{ headerTitle: '권한 설정', headerTitleAlign: 'center' }}
      />
    </Stack.Navigator>
  );
};

const BottomTab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: theme.colors.primary,
        inactiveTintColor: Colors.grey700,
      }}>
      <BottomTab.Screen
        name="FirstStack"
        component={MyPlantStack}
        options={{
          tabBarLabel: 'My Plants',
          tabBarIcon: ({ color }) => <IconButton icon="clover" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="SecondStack"
        component={MyInfoStack}
        options={{
          tabBarLabel: 'My Page',
          tabBarIcon: ({ color }) => <IconButton icon="face" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
};

const FullPagesStack = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyPlantLogNew"
        component={MyPlantLogNew}
        options={({ navigation, route }) => ({
          headerTitle: route.params.title,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Button onPress={() => navigation.goBack()}>취소</Button>
          ),
        })}
      />
      <Stack.Screen
        name="AddPlant"
        component={AddPlant}
        options={({ navigation }) => ({
          headerTitle: '식물 추가',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Button onPress={() => navigation.goBack()}>취소</Button>
          ),
        })}
      />
      <Stack.Screen
        name="SelectParameters"
        component={SelectParameters}
        options={({ navigation }) => ({
          headerTitle: '속성 설정',
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name="SearchPlantData"
        component={SearchPlantData}
        options={({ navigation }) => ({
          headerTitle: '식물 정보 검색',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Button onPress={() => navigation.goBack()}>취소</Button>
          ),
        })}
      />
      <Stack.Screen
        name="MyPlantInfoEdit"
        component={MyPlantInfoEdit}
        options={({ navigation }) => ({
          headerTitle: '식물 정보 수정',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Button onPress={() => navigation.goBack()}>취소</Button>
          ),
        })}
      />
      <Stack.Screen
        name="MyInfoEdit"
        component={MyInfoEdit}
        options={({ navigation }) => ({
          headerTitle: '내 정보 수정',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Button onPress={() => navigation.goBack()}>취소</Button>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SearchIdPw" component={SearchIdPw} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

const AuthContext = createContext();
const TokenContext = createContext();

const AppNavigator = () => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            userId: action.userId,
            isLoading: false,
          };
        case 'LOGIN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            userId: action.userId,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            userId: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      userId: null,
    },
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      let userId;
      try {
        userToken = await AsyncStorage.getItem('token');
        userId = await AsyncStorage.getItem('userId');
        console.log('스토리지 토큰?', userToken);
        console.log('스토리지 아이디?', userId);
      } catch (e) {
        // Restoring token failed
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken, userId });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      login: async data => {
        let token = null;
        let userId = null;
        Auth.login(data)
          .then(async res => {
            console.log('login status?', res.status);
            token = await AsyncStorage.getItem('token');
            userId = await AsyncStorage.getItem('userId');
          })
          .then(() => {
            console.log('token?', token);
            console.log('스토리지 ', AsyncStorage);
            token !== null
              ? dispatch({ type: 'LOGIN', token, userId })
              : Alert.alert(
                  '로그인에 실패하였습니다',
                  '입력하신 이메일 또는 비밀번호를 확인해 주세요',
                  [{ text: '확인', onPress: () => console.log('OK Pressed') }],
                  { cancelable: false },
                );
          });
      },
      signOut: async headers => {
        Auth.logout(headers).then(res => {
          res.status === 200
            ? dispatch({ type: 'SIGN_OUT' })
            : Alert.alert(
                '로그아웃에 실패하였습니다',
                '',
                [{ text: '확인', onPress: () => console.log('OK Pressed') }],
                { cancelable: false },
              );
        });
      },
      signUp: async (signUpData, loginData) => {
        let token = null;
        Auth.signup(signUpData).then(status => {
          status === 201
            ? Auth.login(loginData)
                .then(async status => {
                  console.log('login status?', status);
                  token = await AsyncStorage.getItem('token');
                })
                .then(() => {
                  console.log('token?', token);
                  token !== null
                    ? dispatch({ type: 'LOGIN', token })
                    : Alert.alert(
                        '로그인에 실패하였습니다',
                        '로그인을 다시 시도해 주세요',
                        [
                          {
                            text: '확인',
                            onPress: () => console.log('OK Pressed'),
                          },
                        ],
                        { cancelable: false },
                      );
                })
            : Alert.alert(
                '입력된 정보를 다시 확인해주세요',
                status,
                [{ text: '확인', onPress: () => console.log('OK Pressed') }],
                { cancelable: false },
              );
        });
      },
    }),
    [],
  );

  const headers = {
    headers: {
      headers: {
        Authorization: `Bearer ${state.userToken}`,
      },
    },
    userId: state.userId,
  };

  if (state.isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <TokenContext.Provider value={headers}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {state.userToken == null ? (
            <Stack.Screen name="AuthStack" component={AuthStack} />
          ) : (
            <Stack.Screen name="FullPagesStack" component={FullPagesStack} />
          )}
        </Stack.Navigator>
      </TokenContext.Provider>
    </AuthContext.Provider>
  );
};

export { AppNavigator, AuthContext, TokenContext };
