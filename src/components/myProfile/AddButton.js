import { StyleSheet, Pressable, View, Text, useWindowDimensions } from 'react-native';
import { Colors } from '../../globals/styles/Colors';
import { DisplaySizes } from '../../globals/styles/DisplaySizes';

function AddButton({title, onPress}) {
  const { height, width } = useWindowDimensions();

  return (
    <View style={stylesAddButton.container}>
      <Pressable onPress={onPress} style={stylesAddButton.submitButton}>
        <Text style={width < DisplaySizes.minWidth ? stylesAddButton.submitTextMin : stylesAddButton.submitText}>
          {title}
        </Text>
      </Pressable>
    </View>
  );
}

const stylesAddButton = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 10
  },
  submitButton: {
    height: 40,
    width: '100%',
    alignSelf: 'flex-start',
    padding: 5,
    margin: 10,
    borderRadius: 3,
    backgroundColor: Colors.grayDark
  },
  submitText: {
    fontWeight: '600',
    fontSize: 22,
    color: Colors.white,
    textAlign: 'center',
  },
  submitTextMin: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.white,
    textAlign: 'center',
  },
});

export default AddButton;