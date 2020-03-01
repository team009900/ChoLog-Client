import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { UserInfo } from '../../../types/MyInfo/index';
import { buttonStyles } from '../../../style';

// userInfo
interface GoToMyInfoEditButtonProps {
  userInfo: UserInfo;
}

const styles = StyleSheet.create({
  position: {
    ...buttonStyles.buttonPosition,
  },
  contentStyle: {
    ...buttonStyles.contentStyle,
  },
  lableStyle: {
    ...buttonStyles.lableStyle,
  },
});

const GoToMyInfoEditButton = (props: GoToMyInfoEditButtonProps) => {
  const navigation = useNavigation();
  const { userInfo } = props;

  return (
    <View style={styles.position}>
      <Button
        contentStyle={styles.contentStyle}
        labelStyle={styles.lableStyle}
        mode="contained"
        onPress={() => {
          navigation.navigate('MyInfoEdit', { userInfo });
        }}>
        정보 수정
      </Button>
    </View>
  );
};

export default GoToMyInfoEditButton;
