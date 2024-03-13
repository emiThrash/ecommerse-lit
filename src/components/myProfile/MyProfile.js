import { StyleSheet, Image, ScrollView, useWindowDimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Colors } from '../../globals/styles/Colors';
import { DisplaySizes } from '../../globals/styles/DisplaySizes';
import AddButton from './AddButton';

function MyProfile({navigation}) {
  const { height, width } = useWindowDimensions();
  const image = useSelector(state => state.authReducer.value.profilePicture);
  const [ isLandscape, setIsLandscape ] = useState(false);

  useEffect(()=>{
    if(width > height){
      setIsLandscape(true);
    }else{
      setIsLandscape(false);
    }
  }, [height, width]);

  const goToImageSelector = () => {
    navigation.navigate('ImageSelector');
  }

  const goToAddressList = () => {
    navigation.navigate('AddressList');
  }

  return (
    <ScrollView style={isLandscape ? stylesMyProfile.containerLandscape : stylesMyProfile.container}>
      { image ?
        <>
          <Image
          source={{ uri: image }}
          style={stylesMyProfile.image}
          resizeMode='cover' />
          <AddButton
            title='Cambiar foto de perfil'
            onPress={goToImageSelector} />
        </> :
        <>
          <Image
            source={require('../../../assets/user-photo.png')}
            style={stylesMyProfile.image}
            resizeMode='cover' />
          <AddButton
            title='Agregar foto de perfil'
            onPress={goToImageSelector} />
        </>
      }
      <AddButton
        title='Mis ubicaciones'
        onPress={goToAddressList} />
    </ScrollView>
  );
  
}

const stylesMyProfile = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'column',
    width: '100%',
    paddingTop: 19,
    marginBottom: DisplaySizes.paddingBottomNavigator,
  },
  containerLandscape: {
    flex: 0,
    flexDirection: 'column',
    width: '100%',
    paddingTop: 10,
    marginBottom: DisplaySizes.paddingBottomNavigatorLandscape,
  },
  image: {
    width: 96,
    height: 96,
    alignSelf: 'center',
    borderRadius: 50
  }
});

export default MyProfile;