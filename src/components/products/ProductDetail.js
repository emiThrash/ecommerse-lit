import { StyleSheet, Text, View, Image, Pressable, useWindowDimensions, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Colors } from '../../globals/styles/Colors';
import { DisplaySizes } from '../../globals/styles/DisplaySizes';
import { addCartItem } from '../../features/shop/shopSlice';
import { useGetProductByIdQuery } from '../../services/shopService';

function ProductDetail({navigation}) {
  const dispatch = useDispatch();
  const { height, width } = useWindowDimensions();
  const [ isLandscape, setIsLandscape ] = useState(false);
  const [ imageHeight, setImageHeight ] = useState(0);
  const [ imageWidth, setImageWidth ] = useState(0);
  const [ item, setItem ] = useState(null);
  const productId = useSelector(state => state.shopReducer.value.productIdSelected);
  const { data: product, isLoading, error } = useGetProductByIdQuery(productId);

  useEffect(()=>{
    if(width > height){
      setIsLandscape(true);
      setImageHeight(height*0.5);
      setImageWidth(width*0.5);
    }else{
      setIsLandscape(false);
      setImageHeight(height*0.5);
      setImageWidth(width);
    }
  }, [height, width]);

  useEffect(()=>{
    if(!isLoading && product){
      setItem(Object.values(product)[0]);
    }
  }, [product]);

  const onAddProduct = () => {
    dispatch(addCartItem({product: item, quantity: 1}));
  };

  const onBackToList = () => {
    navigation.navigate("ProductList", {categoryId: item.categoryId});
  };

  return(
    item ?
    <ScrollView>
      <View style={stylesProductDetail.container}>
        <View style={stylesProductDetail.zoneBack}>
          <Pressable
            onPress={onBackToList}
            style={width < DisplaySizes.minWidth ? stylesProductDetail.buttonBackMin : stylesProductDetail.buttonBack}>
            <Text style={width < DisplaySizes.minWidth ? stylesProductDetail.textBackMin : stylesProductDetail.textBack}>
              Volver a la lista
            </Text>
          </Pressable>
        </View>
        <View style={isLandscape ? stylesProductDetail.zoneInfoLandscape : stylesProductDetail.zoneInfoPortrait}>
          <View style={{width: isLandscape ? '50%' : '100%'}}>
            <View style={{width: imageWidth, height: imageHeight}}>
              <Image source={{ uri:item.image }} style={stylesProductDetail.image} width={imageWidth} height={imageHeight} resizeMode='cover' />
            </View>
          </View>
          <View style={{width: isLandscape ? '50%' : '100%'}}>
            <Text style={width < DisplaySizes.minWidth ? stylesProductDetail.textMin : stylesProductDetail.text}>
              {item.title}
            </Text>
            <Text style={width < DisplaySizes.minWidth ? stylesProductDetail.textDescriptionMin : stylesProductDetail.textDescription}>
              {item.description}
            </Text>
            <Text style={width < DisplaySizes.minWidth ? stylesProductDetail.textPriceMin : stylesProductDetail.textPrice}>
              ${item.price}
            </Text>
            <Pressable onPress={onAddProduct} style={stylesProductDetail.buyButton}>
              <Text style={width < DisplaySizes.minWidth ? stylesProductDetail.buyTextMin : stylesProductDetail.buyText}>
                Comprar
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView> :
    <></>
  );
}

const stylesProductDetail = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    paddingBottom: DisplaySizes.paddingBottomNavigator,
  },
  zoneBack:{
    width: '100%'
  },
  zoneInfoLandscape:{
    flexDirection: 'row',
    width: '100%',
    marginTop: 10
  },
  zoneInfoPortrait:{
    flexDirection: 'column',
    width: '100%',
  },
  text: {
    width: '100%',
    padding: 10,
    color: Colors.grayDark,
    fontSize: 22,
    fontFamily: 'Dosis-Bold',
    textAlign: 'left'
  },
  textMin: {
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: Colors.grayDark,
    fontSize: 18,
    fontFamily: 'Dosis-Bold',
    textAlign: 'left'
  },
  textDescription: {
    width: '100%',
    padding: 10,
    color: Colors.grayDark,
    fontSize: 20,
    fontFamily: 'Dosis',
    textAlign: 'left'
  },
  textDescriptionMin: {
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: Colors.grayDark,
    fontSize: 16,
    fontFamily: 'Dosis',
    textAlign: 'left'
  },
  textPrice: {
    width: '100%',
    padding: 10,
    color: Colors.grayDark,
    fontSize: 24,
    fontFamily: 'Dosis'
  },
  textPriceMin: {
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: Colors.grayDark,
    fontSize: 20,
    fontFamily: 'Dosis-Bold'
  },
  image: {
    flex: 1,
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
  buyButton: {
    height: 40,
    padding: 5,
    margin: 10,
    borderRadius: 3,
    backgroundColor: Colors.coralMain,
    alignSelf: 'flex-start'
  },
  buyText: {
    fontWeight: '600',
    fontSize: 24,
  },
  buyTextMin: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ProductDetail;