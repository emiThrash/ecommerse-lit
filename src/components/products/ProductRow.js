import { StyleSheet, Text, View, Image, Pressable, useWindowDimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { Colors } from '../../globals/styles/Colors';
import { DisplaySizes } from '../../globals/styles/DisplaySizes';
import { setProductIdSelected, addCartItem } from '../../features/shop/shopSlice';
import iconAdd from '../../../assets/icon-add.png';
import iconDetail from '../../../assets/icon-detail.png';

function ProductRow({navigation, item}) {
  const dispatch = useDispatch();
  const { height, width } = useWindowDimensions();

  const onAddProduct = () => {
    dispatch(addCartItem({product: item, quantity: 1}));
  };

  const onViewDetail = () => {
    dispatch(setProductIdSelected(item.id));
    navigation.navigate("ProductDetail");
  };

  return(
    <View style={stylesProductRow.container}>
      <View style={width < DisplaySizes.minWidth ? stylesProductRow.colImageMin : stylesProductRow.colImage}>
        <Image source={{ uri: item.image }} style={stylesProductRow.image} resizeMode='cover' />
      </View>
      <View style={width < DisplaySizes.minWidth ? stylesProductRow.colDescriptionMin : stylesProductRow.colDescription}>
        <Text style={width < DisplaySizes.minWidth ? stylesProductRow.textMin : stylesProductRow.text}>
          {item.title}
        </Text>
        <Text style={width < DisplaySizes.minWidth ? stylesProductRow.textPriceMin : stylesProductRow.textPrice}>
          ${item.price}
        </Text>
      </View>
      <View style={stylesProductRow.colActions}>
        <Pressable onPress={onViewDetail}>
          <Image source={iconDetail} style={width < DisplaySizes.minWidth ? stylesProductRow.iconMin : stylesProductRow.icon} />
        </Pressable>
        <Pressable onPress={onAddProduct}>
          <Image source={iconAdd} style={width < DisplaySizes.minWidth ? stylesProductRow.iconMin : stylesProductRow.icon} />
        </Pressable>
      </View>
    </View>
  );
}

const stylesProductRow = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 0,
    marginVertical: 9,
    padding: 6,
    backgroundColor: Colors.coralAlter,
    borderRadius: 0
  },
  text: {
    color: Colors.grayDark,
    fontSize: 20,
    fontFamily: 'Dosis-Bold'
  },
  textMin: {
    color: Colors.grayDark,
    fontSize: 16,
    fontFamily: 'Dosis-Bold'
  },
  textPrice: {
    color: Colors.grayDark,
    fontSize: 20,
    fontFamily: 'Dosis-Bold'
  },
  textPriceMin: {
    color: Colors.grayDark,
    fontSize: 16,
    fontFamily: 'Dosis-Bold'
  },
  colImage: {
    width: '25%'
  },
  colImageMin: {
    width: '20%'
  },
  colDescription: {
    width: '55%',
    paddingHorizontal: 20
  },
  colActions: {
    width: '20%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  colDescriptionMin: {
    width: '60%',
    paddingHorizontal: 4
  },
  icon: {
    width: 24,
    height: 24,
    alignSelf: 'flex-end',
  },
  iconMin: {
    width: 20,
    height: 20,
    alignSelf: 'flex-end',
  },
  image: {
    flex: 1,
    width: 'auto',
    height: 'auto',
    borderRadius: 9
  }
});

export default ProductRow;