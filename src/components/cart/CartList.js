import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Colors } from '../../globals/styles/Colors';
import CartRow from './CartRow';

function CartList({list}) {
  return(
    <View style={stylesCartList.container}>
      { list.length > 0 ?
        <FlatList
          data={list}
          renderItem={({item}) => <CartRow item={item} />}
          keyExtractor={item => item.id}
        /> :
        <Text style={stylesCartList.emptyLabel}>Agregue productos</Text>
      }
    </View>
  );
}

const stylesCartList = StyleSheet.create({
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

export default CartList;