import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { List } from 'react-native-paper';

// plants, showSelectedPlantData
interface SearchedPlantListProps {}

const styles = StyleSheet.create({
  container: {},
  image: { width: 70, height: 70, resizeMode: 'cover' },
});

const SearchedPlantList = (props: SearchedPlantListProps) => {
  const { plants, showSelectedPlantData } = props;

  return (
    <View style={styles.container}>
      {plants !== null
        ? plants.map(plant => (
            <List.Item
              key={plant.id}
              plant={plant}
              title={plant.distributionName}
              description={plant.scientificName}
              right={props => (
                <Image
                  {...props}
                  style={styles.image}
                  source={{ uri: plant.images[0].image }}
                />
              )}
              onPress={() => showSelectedPlantData(plant)}
            />
          ))
        : null}
    </View>
  );
};

export default SearchedPlantList;
