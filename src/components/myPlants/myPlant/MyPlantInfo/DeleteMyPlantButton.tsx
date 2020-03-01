import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import theme from '../../../../../theme';

// setIsVisible
interface DeleteMyPlantButtonProps {}

const styles = StyleSheet.create({
  container: {},
});

const DeleteMyPlantButton = (props: DeleteMyPlantButtonProps) => {
  const { setIsVisible } = props;
  return (
    <View style={styles.container}>
      <List.Item
        title="식물 정보 삭제"
        left={props => (
          <List.Icon
            {...props}
            icon="alert-circle"
            color={theme.colors.error}
          />
        )}
        onPress={() => setIsVisible(true)}
      />
    </View>
  );
};

export default DeleteMyPlantButton;
