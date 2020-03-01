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

// hasLevel, isSwitched, switchOn, switchColor
interface LevelParameterListProps {}

const styles = StyleSheet.create({
  container: { marginBottom: 15 },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: { color: theme.colors.primary },
  divider: { backgroundColor: theme.colors.subDivider, height: 1 },
});

const LevelParameterList = (props: LevelParameterListProps) => {
  const { hasLevel, isSwitched, switchOn, switchColor } = props;

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <IconButton icon="chevron-double-up" color={theme.colors.primary} />
        <Subheading style={styles.text}>
          기록할 때 3단계로 설정할 수 있는 속성
        </Subheading>
      </View>
      <Divider style={styles.divider} />
      {hasLevel.map(param => (
        <List.Item
          key={param.id}
          title={param.parameterName}
          description={`${param.description} 중에 고를 수 있습니다.`}
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

export default LevelParameterList;
