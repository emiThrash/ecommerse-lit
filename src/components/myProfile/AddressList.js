import { StyleSheet, View, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetProfileLocationQuery } from '../../services/shopService';
import { Colors } from '../../globals/styles/Colors';
import { DisplaySizes } from '../../globals/styles/DisplaySizes';
import AddressRow from './AddressRow';

function AddressList({navigation}) {
  const [list, setList] = useState([]);
  const {localId} = useSelector(state => state.authReducer.value);
  const { data: locations, isLoading, error } = useGetProfileLocationQuery(localId);

  useEffect(() => {
    if(!isLoading && locations){
      setList(Object.values(locations));
    }
    if(!isLoading && locations === null){
      setList([{latitude: '', longitude: '', address: ''}]);
    }
  },[locations]);

  return(
    <View style={stylesAddressList.container}>
      <FlatList
        data={list}
        renderItem={({item}) => <AddressRow
          item={item}
          navigation={navigation} />}
        keyExtractor={item => `${localId}-${item.latitude}-${item.longitude}`}
      />
    </View>
  );
}

const stylesAddressList = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'top',
    paddingHorizontal: 5,
    paddingTop: 5,
    paddingBottom: DisplaySizes.paddingBottomNavigator,
    borderTopColor: Colors.grayLight,
    borderTopWidth: 1,
    borderBottomColor: Colors.grayLight,
    borderBottomWidth: 1
  },
});

export default AddressList;