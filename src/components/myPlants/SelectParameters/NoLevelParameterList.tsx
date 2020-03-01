import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  List,
  Switch,
  Subheading,
  IconButton,
  Divider,
} from 'react-native-paper';
import theme from '../../../../theme';

// noLevel, isSwitched, switchOn, switchColor
interface NoLevelParameterListProps {}

const styles = StyleSheet.create({
  container: {},
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: { color: theme.colors.primary },
  divider: { backgroundColor: theme.colors.subDivider, height: 1 },
  list: { padding: 10 },
});

const NoLevelParameterList = (props: NoLevelParameterListProps) => {
  const { noLevel, isSwitched, switchOn, switchColor } = props;

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <IconButton icon="chevron-up" color={theme.colors.primary} />
        <Subheading style={styles.text}>기타 속성</Subheading>
      </View>
      <Divider style={styles.divider} />
      {noLevel.map(param => (
        <List.Item
          key={param.id}
          title={param.parameterName}
          style={styles.list}
          left={props => (
            <List.Icon {...props} icon="circle" color={param.color} />
          )}
          right={props => (
            <Switch
              {...props}
              color={switchColor}
              value={isSwitched[param.id]}
              onValueChange={() => switchOn(param.id)}
            />
          )}
        />
      ))}
    </View>
  );
};

export default NoLevelParameterList;
