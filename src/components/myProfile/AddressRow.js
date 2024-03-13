import { StyleSheet, Text, View, Image, Pressable, useWindowDimensions } from 'react-native';
import { Colors } from '../../globals/styles/Colors';
import { DisplaySizes } from '../../globals/styles/DisplaySizes';
import iconMap from '../../../assets/icon-map.png';

function AddressRow({navigation, item}) {
  const { height, width } = useWindowDimensions();

  const onSetLocation = () => {
    navigation.navigate("LocationSelector");
  };

  return(
    <View style={stylesAddressRow.container}>
      <View style={width < DisplaySizes.minWidth ? stylesAddressRow.colDescriptionMin : stylesAddressRow.colDescription}>
        <Text style={width < DisplaySizes.minWidth ? stylesAddressRow.textMin : stylesAddressRow.text}>
          {item.address}
        </Text>
      </View>
      <View style={stylesAddressRow.colActions}>
        <Pressable onPress={onSetLocation}>
          <Image source={iconMap} style={width < DisplaySizes.minWidth ? stylesAddressRow.iconMin : stylesAddressRow.icon} />
          <Text>{item.latitude === '' || item.longitude === '' ? 'Agregar' : 'Cambiar'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const stylesAddressRow = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 0,
    marginVertical: 2,
    padding: 4,
    backgroundColor: Colors.coralAlter,
    borderRadius: 5
  },
  text: {
    color: Colors.grayDark,
    fontSize: 20,
    fontFamily: 'Noto-Bold'
  },
  textMin: {
    color: Colors.grayDark,
    fontSize: 16,
    fontFamily: 'Noto-Bold'
  },
  colDescription: {
    width: '70%',
    paddingHorizontal: 4
  },
  colDescriptionMin: {
    width: '70%',
    paddingHorizontal: 4
  },
  colActions: {
    width: '30%',
    flex: 1,
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
  },
  iconMin: {
    width: 20,
    height: 20,
  },
});

export default AddressRow;