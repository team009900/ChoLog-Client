import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Subheading, Surface, Title } from 'react-native-paper';

interface HeadingProps {}

const styles = StyleSheet.create({
  container: { margin: 15, marginTop: 0 },
});

const Heading = (props: HeadingProps) => {
  return (
    <View style={styles.container}>
      <Subheading>
        이 식물에 대해 기록할 속성을 선택해주세요. 나중에 식물정보에서 설정을
        바꿀 수 있습니다.
      </Subheading>
    </View>
  );
};

export default Heading;
