import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import SearchSvg from '../assets/images/search-normal.svg';
import { useState, useTransition } from 'react';
import { useTranslation } from 'react-i18next';

const Search = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  function searchHandler(text) {
    setSearch(text);
  }
  return (
    <View style={styles.headerSearch}>
      <SearchSvg width={20} height={20} />
      <TextInput
        onChangeText={searchHandler}
        value={search}
        style={styles.input}
        placeholder={t('searchBirthday')}
        returnKeyType="search"
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  headerSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
    borderRadius: 28,
    backgroundColor: 'white',
    paddingHorizontal: 25,
    paddingVertical: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    color: '#988e8ecc',
    fontSize: 16,
  },
});
