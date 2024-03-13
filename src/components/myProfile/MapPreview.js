import { Image, StyleSheet, View, useWindowDimensions } from 'react-native';
import React, {useState, useEffect} from 'react';
import { googleAPI } from '../../firebase/googleAPI';

const MapPreview = ({location}) => {
  const mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=13&size=600x300&maptype=roadmap
&markers=color:red%7Clabel:%7C${location.latitude},${location.longitude}&key=${googleAPI.mapStatic}`;

  const { height, width } = useWindowDimensions();
  const [ isLandscape, setIsLandscape ] = useState(false);

  useEffect(()=>{
    if(width > height){
      setIsLandscape(true);
    }else{
      setIsLandscape(false);
    }
  }, [height, width]);

  return(
    <View style={stylesMapPreview.mapPreview}>
      <Image source={{ uri: mapPreviewUrl }} style={isLandscape ? stylesMapPreview.mapImageLandscape : stylesMapPreview.mapImage} />
    </View>
  );
};

const stylesMapPreview = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapImage: {
    width: 300,
    height: 300
  },
  mapImageLandscape: {
    width: 350,
    height: 350
  }
});

export default MapPreview;