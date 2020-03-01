import * as React from 'react';
import { View, StyleSheet, Picker } from 'react-native';
import { List, TextInput, Subheading } from 'react-native-paper';

// isWeatherExpanded, setIsWeatherExpanded, diaryData,
// onChangeText, selectWeatherName, weatherData, weather
interface WeatherInputsProps {}

const styles = StyleSheet.create({
  container: { marginBottom: 5 },
  inputs: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 5,
  },
  input: { flex: 2, height: 45, marginRight: 12 },
  picker: { flex: 1 },
  item: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  title: { flex: 1, marginRight: 5 },
});
const WeatherInputs = (props: WeatherInputsProps) => {
  const {
    isWeatherExpanded,
    setIsWeatherExpanded,
    diaryData,
    onChangeText,
    selectWeatherName,
    weatherData,
    weather,
  } = props;

  return (
    <View style={styles.container}>
      <List.Accordion
        title="날씨 입력"
        expanded={isWeatherExpanded}
        onPress={() => setIsWeatherExpanded(!isWeatherExpanded)}>
        <View style={styles.inputs}>
          <View style={styles.item}>
            <Subheading style={styles.title}>온도</Subheading>
            <TextInput
              mode="outlined"
              style={styles.input}
              value={diaryData.temperature}
              keyboardType={'number-pad'}
              maxLength={3}
              onChangeText={text => onChangeText('temperature', text)}
            />
          </View>
          <View style={styles.item}>
            <Subheading style={styles.title}>습도</Subheading>
            <TextInput
              mode="outlined"
              style={styles.input}
              value={diaryData.humidity}
              keyboardType={'number-pad'}
              maxLength={2}
              onChangeText={text => onChangeText('humidity', text)}
            />
          </View>
          <View style={styles.item}>
            <Picker
              selectedValue={weather}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) =>
                selectWeatherName(itemIndex, itemValue)
              }>
              {weatherData.map(item => (
                <Picker.Item
                  key={item.id}
                  label={item.name}
                  value={item.name}
                />
              ))}
            </Picker>
          </View>
        </View>
      </List.Accordion>
    </View>
  );
};

export default WeatherInputs;
