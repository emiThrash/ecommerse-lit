import { StyleSheet, Text, View, FlatList, useWindowDimensions } from 'react-native';
import { Colors } from '../../globals/styles/Colors';
import { DisplaySizes } from '../../globals/styles/DisplaySizes';
import { useGetCategoriesQuery } from '../../services/shopService';
import CategoryRow from './CategoryRow';

function CategoryList({navigation}) {
  const { data: list, isLoading, error } = useGetCategoriesQuery();
  const { height, width } = useWindowDimensions();

  return(
    <View style={width < DisplaySizes.minWidth ? stylesCategoryList.containerMin : stylesCategoryList.container}>
      { list && list.length > 0 ?
        <FlatList 
          data={list}
          renderItem={({item}) => <CategoryRow
            item={item}
            navigation={navigation} />}
          keyExtractor={item => item.id}
        /> :
        <Text style={stylesCategoryList.emptyLabel}>No hay categorías disponibles</Text>
      }
    </View>
  );
}

const stylesCategoryList = StyleSheet.create({
  container: {
    height: 160,
    padding: 5,
    marginBottom: 10,
    borderTopColor: Colors.white,
    borderTopWidth: 1,
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
    backgroundColor: Colors.greenMain
  },
  containerMin: {
    height: 140,
    padding: 3,
    marginBottom: 7,
    borderTopColor: Colors.white,
    borderTopWidth: 1,
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
    backgroundColor: Colors.greenMain
  },
  emptyLabel: {
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'italic'
  }
});

export default CategoryList;