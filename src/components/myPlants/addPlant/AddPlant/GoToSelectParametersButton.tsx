import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Subheading, Divider } from 'react-native-paper';
import { buttonStyles } from '../../../../style';
import theme from '../../../../../theme';

// parameters, setParameters(함수)
interface GoToSelectParametersButtonProps {}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  button: { marginBottom: 20 },
  contentStyle: {
    ...buttonStyles.contentStyle,
  },
  lableStyle: {
    ...buttonStyles.lableStyle,
  },
  divider: {
    backgroundColor: theme.colors.disabled,
    height: 1,
  },
});

const GoToSelectParametersButton = (props: GoToSelectParametersButtonProps) => {
  const navigation = useNavigation();
  const { parameters, setParameters } = props;
  const previous = 'AddPlant';
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        style={styles.button}
        contentStyle={styles.contentStyle}
        labelStyle={styles.lableStyle}
        onPress={() =>
          navigation.navigate('SelectParameters', {
            parameters,
            setParameters,
            previous,
          })
        }>
        속성 선택
      </Button>
      <Divider style={styles.divider} />
    </View>
  );
};

export default GoToSelectParametersButton;
