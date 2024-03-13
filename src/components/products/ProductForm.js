import { StyleSheet, TextInput, View, Pressable, Text, Image, useWindowDimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Colors } from '../../globals/styles/Colors';
import { DisplaySizes } from '../../globals/styles/DisplaySizes';
import { setProductSearchText } from '../../features/shop/shopSlice';
import iconSearch from '../../../assets/icon-search.png';
import iconCancel from '../../../assets/icon-cancel.png';

//Search dentro de productos

function ProductForm({lastSearch}) {
  const dispatch = useDispatch();
  const [productToSearch, setProductToSearch] = useState(lastSearch);
  const [error, setError] = useState("");
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    setProductToSearch(lastSearch);
  }, [lastSearch]);

  const validateSearchText = () => {
    const expression = /\d/;

    return !expression.test(productToSearch);
  }

  const onSearchProductPress = () =>{
    if(validateSearchText(productToSearch)){
      setError("");
      dispatch(setProductSearchText(productToSearch));
    }else{
      setError("No se admiten números");
    }
  };

  const onCleanPress = () =>{
    setError("");
    setProductToSearch("");
    dispatch(setProductSearchText(""));
  };

  //Incorporación del TextInput

  return(
    <>
      <View style={stylesProductForm.container}>
        <View style={stylesProductForm.col1}>
          <TextInput
            style={width < DisplaySizes.minWidth ? stylesProductForm.inputMin : stylesProductForm.input}
            placeholder='Producto'
            placeholderTextColor={Colors.grayWhite}
            onChangeText={(text) => setProductToSearch(text)}
            value={productToSearch}></TextInput>
        </View>
        <View style={stylesProductForm.col2}>
          <View style={stylesProductForm.button}>
            <Pressable onPress={onSearchProductPress}>
              <Image source={iconSearch} style={width < DisplaySizes.minWidth ? stylesProductForm.iconMin : stylesProductForm.icon} />
            </Pressable>
            <Pressable onPress={onCleanPress}>
              <Image source={iconCancel} style={width < DisplaySizes.minWidth ? stylesProductForm.iconMin : stylesProductForm.icon} />
            </Pressable>
          </View>
        </View>
      </View>
      {
        error == "" ?
        <></> :
        <View style={stylesProductForm.errorContainer}>
          <Text style={width < DisplaySizes.minWidth ? stylesProductForm.errorTextMin : stylesProductForm.errorText}>{error}</Text>
        </View>
      }
    </>
  );
}

const stylesProductForm = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 0,
    marginBottom: 5
  },
  col1: {
    width: '80%'
  },
  col2: {
    width: '20%'
  },
  input: {
    height: 35,
    padding: 3,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    color: Colors.white,
    borderWidth: 1,
    borderColor: Colors.grayLight,
    backgroundColor: Colors.grayLight,
    fontSize: 25,
    fontWeight: '600'
  },
  inputMin: {
    height: 33,
    padding: 3,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    color: Colors.white,
    borderWidth: 1,
    borderColor: Colors.greenAlter,
    backgroundColor: Colors.greenAlter,
    fontSize: 18,
    fontWeight: '400'
  },
  button: {
    height: 37,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderColor: Colors.greenAlter,
    borderWidth: 2
  },
  iconMin: {
    width: 22,
    height: 22,
    alignSelf: 'flex-end',
  },
  icon: {
    width: 22,
    height: 22,
    alignSelf: 'flex-end',
  },
  errorContainer: {
    width: '100%',
    marginBottom: 5
  },
  errorText: {
    color: Colors.redAlert,
    fontSize: 18
  },
  errorTextMin: {
    color: Colors.redAlert,
    fontSize: 16
  }
  
});

export default ProductForm;