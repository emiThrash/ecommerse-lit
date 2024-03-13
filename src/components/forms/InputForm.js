import { StyleSheet, TextInput, View, Text, useWindowDimensions } from 'react-native';
import { useState } from 'react';
import { Colors } from '../../globals/styles/Colors';
import { DisplaySizes } from '../../globals/styles/DisplaySizes';

function InputForm({isSecure, label, onChangeCallback, error}) {
  const { height, width } = useWindowDimensions();
  const [input, setInput] = useState('');

  const onChangeText = (text) => {
    setInput(text);
    onChangeCallback(text);
  }

  return(
    <View style={stylesInputForm.container}>
      <View>
        <Text style={width < DisplaySizes.minWidth ? stylesInputForm.labelMin : stylesInputForm.label}>
          {label}
        </Text>
      </View>
      <View>
        <TextInput
          style={width < DisplaySizes.minWidth ? stylesInputForm.inputMin : stylesInputForm.input}
          placeholder={label}
          placeholderTextColor={Colors.grayDark}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
          value={input}></TextInput>
      </View>
      {
        error == "" || error == null ?
        <></> :
        <View style={stylesInputForm.errorContainer}>
          <Text style={width < DisplaySizes.minWidth ? stylesInputForm.errorTextMin : stylesInputForm.errorText}>
            {error}
          </Text>
        </View>
      }
    </View>
  );
}

const stylesInputForm = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'left',
    flex: 0,
    padding: 5,
    marginBottom: 5,
    width: '100%'
  },
  label:{
    fontSize: 20,
    fontWeight: '400'
  },
  labelMin: {
    fontSize: 18,
    fontWeight: '400'
  },
  input: {
    height: 35,
    padding: 3,
    borderRadius: 5,
    color: Colors.black,
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    fontSize: 18,
    fontWeight: '400'
  },
  inputMin: {
    height: 33,
    padding: 3,
    borderRadius: 5,
    color: Colors.black,
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    fontSize: 14,
    fontWeight: '400'
  },
  errorContainer: {
    width: '96%',
    alignSelf: 'center',
    marginBottom: 5,
    padding: 3,
    backgroundColor: Colors.redAlert,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  errorText: {
    color: Colors.white,
    fontSize: 16
  },
  errorTextMin: {
    color: Colors.white,
    fontSize: 14
  }
});

export default InputForm;