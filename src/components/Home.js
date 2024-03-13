import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { DisplaySizes } from '../globals/styles/DisplaySizes';


function Home({navigation}){
  const { height, width } = useWindowDimensions();

  return(
    <View style={styleHome.container}>
      <Text style={width < DisplaySizes.minWidth ? styleHome.textWelcomeMin : styleHome.textWelcome}>Dev-&-Design</Text>
      <Text style={width < DisplaySizes.minWidth ? styleHome.textMin : styleHome.text}>Servicios de Diseño y Desarrollo</Text>
    </View>
  );
}

const styleHome = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: DisplaySizes.paddingBottomNavigator
  },
  textWelcome: {
    width: '100%',
    marginVertical: 10,
    fontSize: 22,
    fontFamily: 'Dosis-Bold',
    textAlign: 'center'
  },
  textWelcomeMin: {
    width: '100%',
    marginVertical: 6,
    fontSize: 20,
    fontFamily: 'Dosis-Bold',
    textAlign: 'center'
  },
  text: {
    width: '100%',
    fontSize: 20,
    fontFamily: 'Dosis',
    textAlign: 'center'
  },
  textMin: {
    width: '100%',
    fontSize: 12,
    fontFamily: 'Dosis',
    textAlign: 'justify'
  },
});
  
  export default Home;