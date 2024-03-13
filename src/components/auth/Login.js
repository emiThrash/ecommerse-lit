import { StyleSheet, Pressable, View, Text, useWindowDimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Colors } from '../../globals/styles/Colors';
import { DisplaySizes } from '../../globals/styles/DisplaySizes';
import { useLoginMutation } from '../../services/authService';
import { setUser } from '../../features/auth/authSlice';
import { signinSchema } from '../../validations/signinSchema';
import InputForm from '../forms/InputForm';

function Login({navigation}) {
  const dispatch = useDispatch();
  const { height, width } = useWindowDimensions();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [triggerSignup, result] = useLoginMutation();

  useEffect(()=>{
    if(result.data){
      dispatch(setUser({email: result.data.email, idToken: result.data.idToken, localId: result.data.localId}));
    }
  }, [result]);

  const onSubmitForm = () => {
    try {
      setEmailError('');
      setPasswordError('');
  
      const validation = signinSchema.validateSync({email, password});
  
      triggerSignup({
        email,
        password
      });

      setEmail('');
      setPassword('');
    }catch(err){
      if(err.path === 'email'){
        setEmailError(err.message);
      }
      if(err.path === 'password'){
        setPasswordError(err.message);
      }
    }
  }

  const onSignupForm = () => {
    navigation.navigate('Signup');
  }

  return(
    <View style={stylesLogin.container}>
      <View style={stylesLogin.card}>
        <View>
          <Text style={width < DisplaySizes.minWidth ? stylesLogin.titleMin : stylesLogin.title}>
            Usuario
          </Text>
        </View>
        <View>
          <InputForm
            isSecure={false}
            label='Email'
            onChangeCallback={setEmail}
            error={emailError}>
          </InputForm>
          <InputForm
            isSecure={true}
            label='Contraseña'
            onChangeCallback={setPassword}
            error={passwordError}>
          </InputForm>
        </View>
        <View style={stylesLogin.colCenter}>
          <Pressable onPress={onSubmitForm} style={stylesLogin.submitButton}>
            <Text style={width < DisplaySizes.minWidth ? stylesLogin.submitTextMin : stylesLogin.submitText}>
              Loggin
            </Text>
          </Pressable>
        </View>
        <View style={stylesLogin.colCenter}>
          <Text style={width < DisplaySizes.minWidth ? stylesLogin.registerTextMin : stylesLogin.registerText}>
            ¿No tienes cuenta aún? 
          </Text>
          <Pressable onPress={onSignupForm}>
            <Text style={width < DisplaySizes.minWidth ? stylesLogin.registerTextLinkMin : stylesLogin.registerTextLink}>
              Registrarme
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const stylesLogin = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 19
  },
  card: {
    flexDirection: 'column',
    padding: 5,
    borderRadius: 14,
    width: '100%',
    backgroundColor: Colors.coralAlter,
  },
  title: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Dosis-Bold',
    color: Colors.black
  },
  titleMin: {
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Dosis-Bold',
    color: Colors.black
  },
  colCenter: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  submitButton: {
    height: 40,
    width: '50%',
    alignSelf: 'flex-start',
    padding: 4,
    margin: 19,
    borderRadius: 3,
    backgroundColor: Colors.grayDark
  },
  submitText: {
    fontWeight: '600',
    fontSize: 21,
    color: Colors.white,
    textAlign: 'center',
  },
  submitTextMin: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.white,
    textAlign: 'center',
  },
  registerText: {
    fontSize: 20,
    color: Colors.grayDark
  },
  registerTextMin: {
    fontSize: 14,
    color: Colors.grayDark
  },
  registerTextLink: {
    marginLeft: 4,
    fontWeight: '600',
    fontSize: 20,
  },
  registerTextLinkMin: {
    marginLeft: 4,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default Login;