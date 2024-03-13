import { StyleSheet, ScrollView, View, Text, useWindowDimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Location from 'expo-location';
import { Colors } from '../../globals/styles/Colors';
import { DisplaySizes } from '../../globals/styles/DisplaySizes';
import { setProfileLocation } from '../../features/auth/authSlice';
import { usePostProfileLocationMutation } from '../../services/shopService';
import { googleAPI } from '../../firebase/googleAPI';
import AddButton from './AddButton';
import MapPreview from './MapPreview';

const LocationSelector = ({navigation}) => {
  const { height, width } = useWindowDimensions();
  const [ isLandscape, setIsLandscape ] = useState(false);
  const [ location, setLocation ] = useState({latitude: "", longitude: ""});
  const [ error, setError ] = useState("");
  const [ address, setAddress ] = useState("");
  const dispatch = useDispatch();
  const {localId} = useSelector(state => state.authReducer.value);
  const [triggerSaveProfileLocation, result] = usePostProfileLocationMutation();

  useEffect(()=>{
    if(width > height){
      setIsLandscape(true);
    }else{
      setIsLandscape(false);
    }
  }, [height, width]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== "granted") {
        setError('Permiso para acceder a la ubicación denegado.');
        return;
      }
  
      let currentLocation = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude
      });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (location.latitude) {
          const urlReverseGeocode = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${googleAPI.mapStatic}`;
          const response = await fetch(urlReverseGeocode);
          const data = await response.json();
          console.dir(data);
          setAddress(data.results[0].formatted_address);
        }
      } catch (error) {
        setError(error.message);
      }
    })();
  }, [location]);

  const confirmLocation = async () => {
    const locationFormatted = { latitude: location.latitude, longitude: location.longitude, address: address };

    dispatch(setProfileLocation(locationFormatted));
    triggerSaveProfileLocation({location: locationFormatted, localId});
    navigation.navigate('MyProfile');
  };

  return (
    <ScrollView style={isLandscape ? stylesLocationSelector.containerLandscape : stylesLocationSelector.container}>
      { location && error === '' ?
        <>
          <Text style={width < DisplaySizes.minWidth ? stylesLocationSelector.locationTextMin : stylesLocationSelector.locationText}>
            Lat: {location.latitude}, Long:{location.longitude}
          </Text>
          <MapPreview location={location} />
          <Text style={width < DisplaySizes.minWidth ? stylesLocationSelector.locationTextMin : stylesLocationSelector.locationText}>
            {address}
          </Text>
          <View style={isLandscape ? stylesLocationSelector.actionsLandscape : stylesLocationSelector.actions}>
            <AddButton title='Confirmar ubicación' onPress={confirmLocation} />
          </View>
        </> :
        <>
          <View style={stylesLocationSelector.noLocationContainer}>
            <Text style={width < DisplaySizes.minWidth ? stylesLocationSelector.errorTextMin : stylesLocationSelector.errorText}>
              {error}
            </Text>
          </View>
        </>
      }
    </ScrollView>
  );
};

const stylesLocationSelector = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'column',
    width: '100%',
    paddingTop: 10,
    marginBottom: DisplaySizes.paddingBottomNavigator
  },
  containerLandscape: {
    flex: 0,
    flexDirection: 'column',
    width: '100%',
    paddingTop: 10,
    marginBottom: DisplaySizes.paddingBottomNavigatorLandscape
  },
  noLocationContainer: {
    width: '100%',
    alignSelf: 'center',
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
  locationText: {
    width: '100%',
    textAlign: 'center',
    fontSize: 18,
    textAlign: 'center',
  },
  locationTextMin: {
    width: '100%',
    textAlign: 'center',
    fontSize: 14,
    textAlign: 'center',
  },
  errorText: {
    color: Colors.redAlert,
    fontSize: 18,
    textAlign: 'center',
  },
  errorTextMin: {
    color: Colors.redAlert,
    fontSize: 14,
    textAlign: 'center',
  },
  map: {
    width: 96,
    height: 96,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 48
  }
});

export default LocationSelector;