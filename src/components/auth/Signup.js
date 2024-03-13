import { StyleSheet, Pressable, View, Text, useWindowDimensions } from 'react-native';
import { useState } from 'react';
import { Colors } from '../../globals/styles/Colors';
import { DisplaySizes } from '../../globals/styles/DisplaySizes';
import { useSignUpMutation } from '../../services/authService';
import { signupSchema } from '../../validations/signupSchema';
import InputForm from '../forms/InputForm';

function Signup({navigation}) {
  const { height, width } = useWindowDimensions();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [triggerSignup, result] = useSignUpMutation();

  const onSubmitForm = () => {
    try{
      setEmailError('');
      setPasswordError('');
      setConfirmPasswordError('');

      const validation = signupSchema.validateSync({email, password, confirmPassword});
      
      triggerSignup({
        email,
        password
      });

      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }catch(err){
      if(err.path === 'email'){
        setEmailError(err.message);
      }
      if(err.path === 'password'){
        setPasswordError(err.message);
      }
      if(err.path === 'confirmPassword'){
        setConfirmPasswordError(err.message);
      }
    }
  }

  const onLoginForm = () => {
    navigation.navigate('Login');
  }

  return(
    <View style={stylesSignup.container}>
      <View style={stylesSignup.card}>
        <View>
          <Text style={width < DisplaySizes.minWidth ? stylesSignup.titleMin : stylesSignup.title}>
            Datos de la cuenta
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
          <InputForm
            isSecure={true}
            label='Confirmar contraseña'
            onChangeCallback={setConfirmPassword}
            error={confirmPasswordError}>
          </InputForm>
        </View>
        <View style={stylesSignup.colCenter}>
          <Pressable onPress={onSubmitForm} style={stylesSignup.submitButton}>
            <Text style={width < DisplaySizes.minWidth ? stylesSignup.submitTextMin : stylesSignup.submitText}>
                Crear cuenta
            </Text>
          </Pressable>
        </View>
        <View style={stylesSignup.colCenter}>
          <Text style={width < DisplaySizes.minWidth ? stylesSignup.registerTextMin : stylesSignup.registerText}>
            ¿Ya tienes cuenta? 
          </Text>
          <Pressable onPress={onLoginForm}>
            <Text style={width < DisplaySizes.minWidth ? stylesSignup.registerTextLinkMin : stylesSignup.registerTextLink}>
              Iniciar sesión
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const stylesSignup = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 10
  },
  card: {
    flexDirection: 'column',
    padding: 5,
    borderRadius: 10,
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
    padding: 5,
    margin: 10,
    borderRadius: 3,
    backgroundColor: Colors.grayDark
  },
  submitText: {
    fontWeight: '600',
    fontSize: 24,
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

export default Signup;