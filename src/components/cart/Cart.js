import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, useWindowDimensions, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { DisplaySizes } from '../../globals/styles/DisplaySizes';
import { Colors } from '../../globals/styles/Colors';
import { refreshCartTotal, cleanCart } from '../../features/shop/shopSlice';
import { usePostOrderMutation } from '../../services/shopService';
import CartList from './CartList';

function Cart({navigation}){
  const dispatch = useDispatch();
  const list = useSelector(state => state.shopReducer.value.cartItems);
  const total = useSelector(state => state.shopReducer.value.cartTotal);
  const { height, width } = useWindowDimensions();
  const [ isLandscape, setIsLandscape ] = useState(false);
  const [triggerPost, result] = usePostOrderMutation();

  useEffect(()=>{
    if(width > height){
      setIsLandscape(true);
    }else{
      setIsLandscape(false);
    }
  }, [height, width]);
  
  useEffect(() => {
    dispatch(refreshCartTotal());
  },[]);

  const confirmCart = () => {
    triggerPost({total, buyCartList: list, date: new Date(), user: 'loggedUser'});
    dispatch(cleanCart());
  };

  return(
    <View style={isLandscape ? stylesCart.containerLandscape : stylesCart.container}>
      <CartList list={list}></CartList>
      <View style={stylesCart.row}>
        <View style={stylesCart.col}>
          {
            list.length > 0 ?
            <Pressable onPress={confirmCart} style={stylesCart.confirmButton}>
            <Text style={stylesCart.confirmText}>¡Comprar!</Text>
          </Pressable> :
          <></>}
        </View>
        <View style={stylesCart.col}>
          <Text style={stylesCart.total}>Total ${total}</Text>
        </View>
      </View>
    </View>
  );
}

const stylesCart = StyleSheet.create({
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
    paddingTop: 10,
    fontSize: 18,
    fontFamily: 'Dosis-Bold',
    textAlign: 'right'
  },
  row: {
    flex: 0,
    flexDirection: 'row'
  },
  col: {
    width: '50%'
  },
  confirmButton: {
    height: 36,
    padding: 5,
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 3,
    backgroundColor: Colors.greenMain,
    alignSelf: 'flex-start'
  },
  confirmText: {
    fontSize: 18,
    fontFamily: 'Dosis-Bold',
    lineHeight: 22
  }
});

export default Cart;