import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import theme from '../../../../../theme';

// parameters, plantId
interface GoToSelectParametersButtonProps {}

const styles = StyleSheet.create({
  container: {},
});

const GoToSelectParametersButton = (props: GoToSelectParametersButtonProps) => {
  const navigation = useNavigation();
  const { parameters, plantId } = props;
  return (
    <View style={styles.container}>
      <List.Item
        title="속성 정보 수정"
        left={props => (
          <List.Icon {...props} icon="star" color={theme.colors.accent} />
        )}
        onPress={() =>
          navigation.navigate('SelectParameters', {
            parameters,
            plantId,
          })
        }
      />
    </View>
  );
};

export default GoToSelectParametersButton;
