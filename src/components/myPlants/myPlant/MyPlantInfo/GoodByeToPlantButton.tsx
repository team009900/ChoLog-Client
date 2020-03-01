import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import theme from '../../../../../theme';

// plantInfo.id
interface GoodByeToPlantButtonProps {
  id: number;
}

const styles = StyleSheet.create({
  container: {},
});

// 식물 id로 수정 요청하기 -> 날짜를 어떤 형식으로 보내야 하는가? 날짜 고르기는 DatePicker 모듈을 사용하나?
const GoodByeToPlantButton = (props: GoodByeToPlantButtonProps) => {
  return (
    <View style={styles.container}>
      <List.Item
        title="초록별로 떠나보내기"
        left={props => (
          <List.Icon {...props} icon="pine-tree" color={theme.colors.primary} />
        )}
      />
    </View>
  );
};

export default GoodByeToPlantButton;
