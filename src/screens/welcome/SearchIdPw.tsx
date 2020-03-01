import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native';
import {
  SearchIdPwTitle,
  SearchIdPwEmailInput,
  SearchIdButton,
  SearchPwIdInput,
  SearchPwButton,
} from '../../components/welcome/SearchIdPw';
import theme from '../../../theme';

interface SearchIdPwProps {}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  contentsContainer: {
    height,
    backgroundColor: theme.colors.background,
  },
  background: { flex: 1 },
  title: { flex: 1 },
  inputs: { flex: 3, alignItems: 'center', justifyContent: 'flex-start' },
  findId: { width: '70%', marginBottom: 25 },
  findPw: { width: '70%' },
});

const SearchIdPw = (props: SearchIdPwProps) => {
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  return (
    <ScrollView contentContainerStyle={styles.contentsContainer}>
      <View style={styles.title}>
        <SearchIdPwTitle />
      </View>
      <View style={styles.inputs}>
        <View style={styles.findId}>
          <View>
            <SearchIdPwEmailInput
              userEmail={userEmail}
              setUserEmail={setUserEmail}
            />
            <SearchIdButton />
          </View>
        </View>
        <View style={styles.findPw}>
          <View>
            <SearchIdPwEmailInput
              userEmail={userEmail}
              setUserEmail={setUserEmail}
            />
            <SearchPwIdInput userId={userId} setUserId={setUserId} />
            <SearchPwButton />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SearchIdPw;
