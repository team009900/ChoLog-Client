import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Subheading, IconButton } from 'react-native-paper';
import theme from '../../../../../../theme';

// diaryData
interface WeatherInfoBarProps {}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginTop: 20, marginBottom: 10 },
  textWrapper: { flexDirection: 'row', alignItems: 'center' },
  text: { color: theme.colors.subText, marginRight: 5 },
  icon: { margin: 0 },
});

const WeatherInfoBar = (props: WeatherInfoBarProps) => {
  const { diaryData, findWeatherName } = props;
  const { temperature, humidity, weatherId } = diaryData;

  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <IconButton
          style={styles.icon}
          icon="temperature-celsius"
          size={20}
          color={theme.colors.primary}
        />
        <Subheading style={styles.text}>온도 {temperature || '-'}</Subheading>
        <IconButton
          style={styles.icon}
          icon="water"
          size={20}
          color={theme.colors.primary}
        />

        <Subheading style={styles.text}>습도 {humidity || '-'}</Subheading>
        <IconButton
          style={styles.icon}
          icon="weather-sunny"
          size={20}
          color={theme.colors.primary}
        />
        <Subheading style={styles.text}>
          날씨 {findWeatherName(weatherId) || '-'}
        </Subheading>
      </View>
    </View>
  );
};

export default WeatherInfoBar;
