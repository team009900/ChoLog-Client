import * as React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Subheading, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

// logList, parametersData(파라미터 종류를 담은 객체),plantParameter
interface MyPlantManageLogsListProps {}

const styles = StyleSheet.create({
  container: { flex: 1, width: '90%' },
  logWrapper: {
    flex: 1,
    height: 70,
    marginBottom: 10,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 8,
  },
  imageStyle: {
    flex: 1,
    opacity: 0.6,
    borderRadius: 8,
  },
  date: { color: 'rgb(255, 255, 255)', fontWeight: '700' },
  text: { color: 'rgb(255, 255, 255)' },
});

const MyPlantManageLogsList = (props: MyPlantManageLogsListProps) => {
  const navigation = useNavigation();
  const { logList, parametersData, plantParameter, weatherData } = props;

  // 일기에 사진이 없을 때 적용하는 배경 패턴 이미지, 일기에 사진이 없을 때 적용하는 배경 패턴 이미지
  const defaultPlantImage =
    'https://cholog.s3.ap-northeast-2.amazonaws.com/default/ChoLogDefaultPattern.png';

  if (!logList) return null;
  return (
    <View style={styles.container}>
      {logList.map(log => (
        <TouchableOpacity
          key={log.id}
          style={styles.logWrapper}
          onPress={() =>
            navigation.navigate('MyPlantLog', {
              title: log.createdAt,
              diaryId: log.id,
              parametersData,
              plantParameter,
              weatherData,
            })
          }>
          <ImageBackground
            style={styles.imageBackground}
            imageStyle={styles.imageStyle}
            source={{ uri: log.image || defaultPlantImage }}>
            <Paragraph style={styles.date}>{log.createdAt}</Paragraph>
            <Subheading
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.text}>
              {log.note}
            </Subheading>
          </ImageBackground>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default MyPlantManageLogsList;
