import * as React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { IconButton, Button } from 'react-native-paper';
import theme from '../../../../../../theme';

// loggedState
interface ParameterListProps {}

const styles = StyleSheet.create({
  container: {},
  surface: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 15,
    paddingLeft: 18,
    paddingRight: 12,
  },
  buttonWrapper: {
    flex: 1,
    alignItems: 'center',
    marginRight: 8,
  },
  button: {
    borderRadius: 30,
    marginBottom: 1,
  },
  contentStyle: {
    padding: 5,
  },
  iconsWrapper: {
    flex: 1,
    flexDirection: 'row',
    margin: 0,
  },
  icon: { margin: 0 },
});

const ParameterList = (props: ParameterListProps) => {
  const { hasLevel, noLevel } = props;
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.surface}>
          {hasLevel.map(param => (
            <View key={param.id} style={styles.buttonWrapper}>
              <Button
                mode="contained"
                style={styles.button}
                contentStyle={styles.contentStyle}
                color={param.color}>
                {param.parameterName}
              </Button>
              <View style={styles.iconsWrapper}>
                <IconButton
                  style={styles.icon}
                  icon="circle"
                  size={15}
                  color={
                    !(param.level >= 1) ? theme.colors.subDivider : param.color
                  }
                />
                <IconButton
                  style={styles.icon}
                  icon="circle"
                  size={15}
                  color={
                    !(param.level >= 2) ? theme.colors.subDivider : param.color
                  }
                />
                <IconButton
                  style={styles.icon}
                  icon="circle"
                  size={15}
                  color={
                    !(param.level >= 3) ? theme.colors.subDivider : param.color
                  }
                />
              </View>
            </View>
          ))}
          {noLevel.map(param => (
            <View key={param.id} style={styles.buttonWrapper}>
              <Button
                mode="contained"
                style={styles.button}
                contentStyle={styles.contentStyle}
                color={param.color}>
                {param.parameterName}
              </Button>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ParameterList;
