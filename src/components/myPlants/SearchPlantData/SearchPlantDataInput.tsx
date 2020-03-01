import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

// query, setQuery(함수)
interface SearchPlantDataInputProps {}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

const SearchPlantDataInput = (props: SearchPlantDataInputProps) => {
  const { query, setQuery, onPressSearch } = props;
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="식물명, 학명으로 검색"
        value={query}
        onChangeText={text => setQuery(text)}
        onIconPress={onPressSearch}
        onSubmitEditing={onPressSearch}
      />
    </View>
  );
};

export default SearchPlantDataInput;
