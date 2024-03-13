import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { Colors } from '../../globals/styles/Colors';
import { DisplaySizes } from '../../globals/styles/DisplaySizes';
import OrderCartRow from './OrderCartRow';

function OrderDetail({navigation}) {
  const { height, width } = useWindowDimensions();
  const item = useSelector(state => state.shopReducer.value.orderCartSelected);
  const [ isLandscape, setIsLandscape ] = useState(false);

  useEffect(()=>{
    if(width > height){
      setIsLandscape(true);
    }else{
      setIsLandscape(false);
    }
  }, [height, width]);

  const onBackToList = () => {
    navigation.navigate("Order");
  };

  return(
    <View style={isLandscape ? stylesOrderDetail.containerLandscape : stylesOrderDetail.container}>
      <View style={stylesOrderDetail.zoneBack}>
        <Pressable
          onPress={onBackToList}
          style={width < DisplaySizes.minWidth ? stylesOrderDetail.buttonBackMin : stylesOrderDetail.buttonBack}>
          <Text style={width < DisplaySizes.minWidth ? stylesOrderDetail.textBackMin : stylesOrderDetail.textBack}>
            Volver a la lista
          </Text>
        </Pressable>
      </View>
      <View style={stylesOrderDetail.listContainer}>
        <FlatList
          data={item.buyCartList}
          renderItem={({item}) => <OrderCartRow item={item} />}
          keyExtractor={item => item.id}
        />
      </View>
      <View>
        <Text style={stylesOrderDetail.total}>Total ${item.total}</Text>
      </View>
    </View>
  );
}

const stylesOrderDetail = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'top',
    justifyContent: 'top',
    flex: 1,
    paddingBottom: DisplaySizes.paddingBottomNavigator,
  },
  containerLandscape: {
    flexDirection: 'column',
    alignItems: 'top',
    justifyContent: 'top',
    flex: 1,
    paddingBottom: DisplaySizes.paddingBottomNavigatorLandscape,
  },
  listContainer: {
    flex: 1,
    padding: 5,
    borderTopColor: Colors.grayLight,
    borderTopWidth: 1,
    borderBottomColor: Colors.grayLight,
    borderBottomWidth: 1
  },
  zoneBack:{
    width: '100%'
  },
  buttonBack: {
    width: '100%',
    height: 40,
    backgroundColor: Colors.coralAlter
  },  
  buttonBackMin: {
    width: '100%',
    height: 36,
    backgroundColor: Colors.coralAlter
  },
  textBack: {
    width: '100%',
    lineHeight: 40,
    color: Colors.grayDark,
    fontSize: 22,
    fontFamily: 'Dosis-Bold',
    textAlign: 'center'
  },
  textBackMin: {
    lineHeight: 36,
    color: Colors.grayDark,
    fontSize: 18,
    fontFamily: 'Dosis-Bold',
    textAlign: 'center'
  },
  total: {
    paddingRight: 5,
    fontSize: 18,
    fontFamily: 'Dosis-Bold',
    textAlign: 'right'
  }
});

export default OrderDetail;