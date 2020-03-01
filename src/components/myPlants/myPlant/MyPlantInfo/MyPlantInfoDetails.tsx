import * as React from 'react';
import { Image, View, StyleSheet, Dimensions } from 'react-native';
import {
  Paragraph,
  Title,
  Subheading,
  Surface,
  IconButton,
} from 'react-native-paper';
import { PlantInfo } from '../../../../types/MyPlantInfo';
import theme from '../../../../../theme';

const { width } = Dimensions.get('window');

// plantInfo
interface MyPlantInfoDetailsProps {}

const styles = StyleSheet.create({
  image: {
    width,
    height: width,
    marginBottom: 5,
  },
  surface: {
    backgroundColor: theme.colors.lightPrimary,
    padding: 18,
    paddingTop: 12,
  },
  advice: { lineHeight: 24 },
  details: { flex: 1, padding: 20 },
  item: { color: theme.colors.primary, fontWeight: '700' },
  contents: { marginBottom: 18 },
  dateWrapper: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  date: { marginRight: 10 },
  countDate: { color: theme.colors.subPrimary },
  adviceTitle: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  iconButton: { margin: 0 },
});

const MyPlantInfoDetails = (props: MyPlantInfoDetailsProps) => {
  const { plantInfo, dayCounter } = props;

  // 식물 대표 이미지가 없을 때 사용하는 디폴트 이미지(정사각형)
  const defaultPlantImage =
    'https://cholog.s3.ap-northeast-2.amazonaws.com/default/ChoLogPlantDefualtImageSquare.png';

  return (
    <View style={styles.container}>
      {plantInfo.image === '' || plantInfo.image === null ? (
        <Image style={styles.image} source={{ uri: defaultPlantImage }} />
      ) : (
        <Image style={styles.image} source={{ uri: plantInfo.image }} />
      )}

      <View style={styles.details}>
        <Paragraph style={styles.item}>식물 종류</Paragraph>
        <Title style={styles.contents}>
          {plantInfo.plantName === '' ? '-' : plantInfo.plantName}
        </Title>
        <Paragraph style={styles.item}>내가 부르는 이름</Paragraph>
        <Title style={styles.contents}>
          {plantInfo.nickname === '' ? '-' : plantInfo.nickname}
        </Title>
        <Paragraph style={styles.item}>학명</Paragraph>
        <Title style={styles.contents}>
          {plantInfo.scientificName === '' ? '-' : plantInfo.scientificName}
        </Title>
        <Paragraph style={styles.item}>데려온 날</Paragraph>
        <View style={styles.dateWrapper}>
          <Title style={styles.date}>
            {plantInfo.adoptionDate === '' ? '-' : plantInfo.adoptionDate}
          </Title>
          {plantInfo.adoptionDate === '' ? null : (
            <Paragraph style={styles.countDate}>
              함께한지 {dayCounter(plantInfo.adoptionDate)}일
            </Paragraph>
          )}
        </View>
        <Paragraph style={styles.item}>메모</Paragraph>
        <Title style={styles.contents}>
          {plantInfo.memo === '' ? '-' : plantInfo.memo}
        </Title>
      </View>
      {plantInfo.advice ? (
        <Surface style={styles.surface}>
          <View style={styles.adviceTitle}>
            <IconButton
              style={styles.iconButton}
              icon="leaf"
              size={20}
              color={theme.colors.primary}
            />
            <Subheading>Tip</Subheading>
          </View>
          <Subheading style={styles.advice}>{plantInfo.advice}</Subheading>
        </Surface>
      ) : null}
    </View>
  );
};

export default MyPlantInfoDetails;
