import React, { useState } from 'react';
import { View,  StyleSheet } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import produce from 'immer';
import theme from '../../../../../theme';

interface MyPlantManageLogsCalendarProps {}

const styles = StyleSheet.create({
  container: { flex: 1, width: '97%', marginBottom: 35 },
  dots: { width: '95%', flexDirection: 'row', justifyContent: 'flex-end', flexWrap: 'wrap' },
});

const MyPlantManageLogsCalendar = (props: MyPlantManageLogsCalendarProps) => {
  const calenderTheme = {
    backgroundColor: theme.colors.background,
    calendarBackground: theme.colors.background,
    // textSectionTitleColor: theme.colors.text,
    selectedDayBackgroundColor: theme.colors.primary,
    selectedDayTextColor: theme.colors.text,
    todayTextColor: theme.colors.primary,
    // dayTextColor: '#2d4150',
    // textDisabledColor: '#d9e1e8',
    // dotColor: theme.colors.accent,
    // selectedDotColor: theme.colors.accent,
    arrowColor: theme.colors.primary,
    disabledArrowColor: theme.colors.subDivider,
    // monthTextColor: 'blue',
    // indicatorColor: 'blue',
    // textDayFontFamily: 'monospace',
    // textMonthFontFamily: 'monospace',
    // textDayHeaderFontFamily: 'monospace',
    // textDayFontWeight: '300',
    // textMonthFontWeight: 'bold',
    // textDayHeaderFontWeight: '300',
    textDayFontSize: 16,
    textMonthFontSize: 17,
    textDayHeaderFontSize: 15,
  };

  LocaleConfig.locales.kr = {
    monthNames: [
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월',
    ],
    monthNamesShort: [
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월',
    ],
    dayNames: [
      '일요일',
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
    ],
    dayNamesShort: ['월', '화', '수', '목', '금', '토', '일'],
    today: '오늘',
  };

  LocaleConfig.defaultLocale = 'kr';

  const {
    date,
    setDate,
    parametersData,
    logDataDatesAndStates,
    filteringData,
    filtered,
    setFiltered,
    setYearMonth,
  } = props;

  const parametersDataCopy = produce(parametersData, draftState => {
    draftState;
  });

  // ↓ 달력에 점 찍을 때 필요한 데이터만 추출
  const parametersDotData = parametersDataCopy.map(data => {
    return {
      id: data.id,
      key: data.parameterName,
      color: data.color,
      selectedDotColor: data.color,
    };
  });
  // ↓ 달력에 점 찍을 날짜들과 각 날짜에 어떤 점들 찍을지 구성하기(markedDates)
  const markedDates = {};

  logDataDatesAndStates.forEach(data => {
    markedDates[String(data.date)] = {
      dots: data.states
        .map(state => {
          return parametersDotData.filter(dots => {
            return dots.id === state;
          });
        })
        .flat(),
      selected: true,
      selectedColor: theme.colors.lightPrimary,
    };
  });
  console.log('filtered?', filtered);
  const [selectedDate, setSelectedDate] = useState();
  if (filtered) {
    if (markedDates[selectedDate]) {
      markedDates[selectedDate] = {
        ...markedDates[selectedDate],
        selectedColor: theme.colors.primary,
      };
    } else if (selectedDate) {
      markedDates[selectedDate] = {
        selected: true,
        selectedColor: theme.colors.primary,
      };
    }
  } else if (!filtered) {
    if (markedDates[selectedDate]) {
      markedDates[selectedDate] = {
        ...markedDates[selectedDate],
        selectedColor: theme.colors.lightPrimary,
      };
    } else if (selectedDate) {
      markedDates[selectedDate] = {
        selected: false,
      };
    }
  }

  console.log('선택된날짜', selectedDate);
  console.log('달력표시정보', Object.values(markedDates));
  const paramDots = Object.values(markedDates)
    .map(item => {
      return item.dots;
    })
    .reduce((acc, curr) => {
      return acc.concat(curr);
    }, []);
  let orderedParamDots = Array.from(new Set(paramDots)).sort((a, b) => {
    return a.id - b.id;
  });
  console.log('ordered?', orderedParamDots);

  return (
    <View style={styles.container}>
      <Calendar
        monthFormat={'yyyy MMMM'}
        theme={calenderTheme}
        hideExtraDays={true}
        markingType={'multi-dot'}
        markedDates={markedDates}
        onMonthChange={({ year, month }) =>
          setYearMonth({ year, month: String(month) })
        }
        onDayPress={({ dateString }) => {
          setSelectedDate(dateString);
          setDate(dateString);
          filteringData(dateString);
          setFiltered(filtered === dateString ? null : dateString);
        }}
      />
        {/* <View style={styles.dots}>
      {orderedParamDots.map(dot => (
        <>
          <IconButton icon='circle' size={6} color={dot.color}/>
          <Text>{dot.key}</Text>
        </>
      ))}
      </View> */}
    </View>
  );
};

export default MyPlantManageLogsCalendar;
