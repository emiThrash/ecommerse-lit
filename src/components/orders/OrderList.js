import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Colors } from '../../globals/styles/Colors';
import OrderRow from './OrderRow';

function OrderList({list, navigation}) {
  return(
    <View style={stylesOrderList.container}>
      { list.length > 0 ?
        <FlatList
          data={list}
          renderItem={({item}) => <OrderRow item={item} navigation={navigation} />}
          keyExtractor={item => item.id}
        /> :
        <Text style={stylesOrderList.emptyLabel}>Agregar órdenes</Text>
      }
    </View>
  );
}

const stylesOrderList = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'top',
    padding: 5,
    borderTopColor: Colors.grayLight,
    borderTopWidth: 1,
    borderBottomColor: Colors.grayLight,
    borderBottomWidth: 1
  },
  emptyLabel: {
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'italic'
  }
});

export default OrderList;