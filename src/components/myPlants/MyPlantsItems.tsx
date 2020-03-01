import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Subheading, Paragraph, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import theme from '../../../theme';

// item(식물목록), parametersData(제일 위에서부터 내려온 파라미터 목록), dayCounter, addPlantCardImage
interface MyPlantsItemsProps {}

const styles = StyleSheet.create({
  wrapper: { flexDirection: 'row', flexWrap: 'wrap' },
  container: {
    width: '50%',
    paddingLeft: 9,
    paddingRight: 9,
    paddingBottom: 25,
  },
  card: { marginBottom: 6 },
  nickname: { fontSize: 17, marginLeft: 5, marginBottom: 0, fontWeight: '700' },
  dateWrapper: { flexDirection: 'row', alignItems: 'center' },
  icon: { margin: 0 },
  addPlantText: { color: theme.colors.primary, fontWeight: '700' },
});

const MyPlantsItems = (props: MyPlantsItemsProps) => {
  const navigation = useNavigation();
  const { items, parametersData, dayCounter, addPlantCardImage } = props;

  return (
    <View style={styles.wrapper}>
      {items.map((item, key) => (
        <View style={styles.container} key={key}>
          <Card
            style={styles.card}
            onPress={() =>
              navigation.navigate('MyPlantManageLogs', {
                plantName: item.nickname,
                plantId: item.id,
                image: item.image,
              })
            }>
            <Card.Cover source={{ uri: item.image }} />
          </Card>
          <Subheading style={styles.nickname}>{item.nickname}</Subheading>
          <View style={styles.dateWrapper}>
            <IconButton
              style={styles.icon}
              icon="heart"
              color={theme.colors.primary}
              size={18}
            />
            <Paragraph>D+{dayCounter(item.adoptionDate)}</Paragraph>
          </View>
        </View>
      ))}
      <View style={styles.container}>
        <Card
          style={styles.card}
          onPress={() => navigation.navigate('AddPlant', { parametersData })}>
          <Card.Cover source={{ uri: addPlantCardImage }} />
        </Card>
        <View style={styles.dateWrapper}>
          <IconButton
            style={styles.icon}
            icon="plus"
            color={theme.colors.primary}
            size={18}
          />
          <Subheading style={styles.addPlantText}>식물추가하기</Subheading>
        </View>
      </View>
    </View>
  );
};

export default MyPlantsItems;
