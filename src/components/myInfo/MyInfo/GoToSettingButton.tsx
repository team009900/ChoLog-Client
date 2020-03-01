import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { buttonStyles } from '../../../style';
import theme from '../../../../theme';

interface GoToSettingButtonProps {}

const styles = StyleSheet.create({
  contentStyle: {
    ...buttonStyles.contentStyle,
    backgroundColor: theme.colors.accent,
  },
  lableStyle: {
    ...buttonStyles.lableStyle,
  },
});

const GoToSettingButton = (props: GoToSettingButtonProps) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Button
        contentStyle={styles.contentStyle}
        labelStyle={styles.lableStyle}
        mode="contained"
        onPress={() => navigation.navigate('Setting')}>
        권한 설정
      </Button>
    </View>
  );
};

export default GoToSettingButton;
