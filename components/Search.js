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
import { useState } from 'react';
const Search = () => {
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
        placeholder="Search birthYay"
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
