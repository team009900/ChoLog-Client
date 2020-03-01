import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import theme from '../../../../../theme';
import { PlantInfo } from '../../../../types/MyPlantInfo';

// plantInfo, parameters, setParameters
interface GoToMyPlantInfoEditButtonProps {
  plantInfo: PlantInfo;
}

const styles = StyleSheet.create({
  container: {},
});

const GoToMyPlantInfoEditButton = (props: GoToMyPlantInfoEditButtonProps) => {
  const navigation = useNavigation();
  const { plantInfo } = props;
  return (
    <View style={styles.container}>
      <List.Item
        title="식물 정보 수정"
        left={props => (
          <List.Icon {...props} icon="pencil" color={theme.colors.primary} />
        )}
        onPress={() =>
          navigation.navigate('MyPlantInfoEdit', {
            plantInfo,
          })
        }
      />
    </View>
  );
};

export default GoToMyPlantInfoEditButton;
