import { StyleSheet, Image, View, Text, useWindowDimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '../../globals/styles/Colors';
import { DisplaySizes } from '../../globals/styles/DisplaySizes';
import { setProfilePicture } from '../../features/auth/authSlice';
import { usePostProfileImageMutation } from '../../services/shopService';
import AddButton from './AddButton';

const ImageSelector = ({navigation}) => {
  const { height, width } = useWindowDimensions();
  const [ isLandscape, setIsLandscape ] = useState(false);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const {localId} = useSelector(state => state.authReducer.value)
  const [triggerSaveProfileImage, result] = usePostProfileImageMutation();

  useEffect(()=>{
    if(width > height){
      setIsLandscape(true);
    }else{
      setIsLandscape(false);
    }
  }, [height, width]);

  const verifyCameraPermissions = async () => {
    const {granted} = await ImagePicker.requestCameraPermissionsAsync();

    return granted;
  };

  const pickImage = async () => {
    const isCameraOk = await verifyCameraPermissions();

    if (isCameraOk) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowEditing: true,
        aspect: [9, 16],
        base64: true,
        quality: 0.2,
      });

      if (!result.canceled) {
        setImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
      }
    }
  };

  const confirmImage = async () => {
    dispatch(setProfilePicture(image));
    triggerSaveProfileImage({image, localId});
    navigation.navigate('MyProfile');
  };

  return (
    <View style={isLandscape ? stylesImageSelector.containerLandscape : stylesImageSelector.container}>
      { image ?
        <>
          <Image source={{ uri: image }} style={stylesImageSelector.image} />
          <View style={isLandscape ? stylesImageSelector.actionsLandscape : stylesImageSelector.actions}>
            <AddButton title='Tomar otra foto' onPress={pickImage} />
            <AddButton title='Confirmar foto' onPress={confirmImage} />
          </View>
        </> :
        <>
          <View style={stylesImageSelector.noPhotoContainer}>
            <Text style={width < DisplaySizes.minWidth ? stylesImageSelector.noPhotoTextMin : stylesImageSelector.noPhotoText}>
              No hay una foto para ver aún
            </Text>
          </View>
          <AddButton title='Tomar foto' onPress={pickImage} />
        </>
      }
    </View>
  );
};

const stylesImageSelector = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 10,
    paddingBottom: DisplaySizes.paddingBottomNavigator
  },
  containerLandscape: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 10,
    paddingBottom: DisplaySizes.paddingBottomNavigatorLandscape
  },
  noPhotoContainer: {
    width: 96,
    height: 96,
    alignSelf: 'center',
    borderColor: Colors.black,
    borderWidth: 1,
    justifyContent: 'center',
    textAlign: 'center'
  },
  actions: {
    width: '100%'
  },
  actionsLandscape: {
    width: '50%',
    alignSelf: 'center',
    textAlign: 'center',
  },
  noPhotoTextText: {
    fontSize: 18,
    textAlign: 'center',
  },
  noPhotoTextMin: {
    fontSize: 14,
    textAlign: 'center',
  },
  image: {
    width: 96,
    height: 96,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 48
  }
});

export default ImageSelector;