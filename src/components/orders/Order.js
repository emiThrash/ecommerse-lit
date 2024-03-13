import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, useWindowDimensions } from 'react-native';
import { DisplaySizes } from '../../globals/styles/DisplaySizes';
import { useGetOrdersQuery } from '../../services/shopService';
import OrderList from './OrderList';

function Order({navigation}){
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  const [list, setList] = useState([]);
  const { height, width } = useWindowDimensions();
  const [total, setTotal] = useState(0);
  const [ isLandscape, setIsLandscape ] = useState(false);

  useEffect(()=>{
    if(width > height){
      setIsLandscape(true);
    }else{
      setIsLandscape(false);
    }
  }, [height, width]);
  
  useEffect(() => {
    if(!isLoading && orders){
      let ordersArray = Object.values(orders);
      setList(ordersArray);
      setTotal(ordersArray.length);
    }else if(list === null){
      setTotal(0);
    }
  },[orders]);

  return(
    list ?
    <View style={isLandscape ? stylesOrder.containerLandscape : stylesOrder.container}>
      <OrderList list={list} navigation={navigation}></OrderList>
      <View>
        <Text style={stylesOrder.total}>{total} compras</Text>
      </View>
    </View> :
    <Text style={stylesOrder.emptyLabel}>No realizó ninguna compra aún.</Text>
  );
}

const stylesOrder = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'top',
    justifyContent: 'top',
    paddingBottom: DisplaySizes.paddingBottomNavigator
  },
  containerLandscape: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'top',
    justifyContent: 'top',
    paddingBottom: DisplaySizes.paddingBottomNavigatorLandscape
  },
  total: {
    paddingRight: 5,
    fontSize: 18,
    fontFamily: 'Noto-Bold',
    textAlign: 'right'
  },
  emptyLabel: {
    textAlign: 'center',
    paddingTop: 10,
    fontSize: 16,
    fontStyle: 'italic'
  }
});

export default Order;