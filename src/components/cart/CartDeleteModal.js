import { StyleSheet, Text, View, Pressable, Modal, useWindowDimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Colors } from '../../globals/styles/Colors';
import { DisplaySizes } from '../../globals/styles/DisplaySizes';
import { deleteCartItem, setProductModalVisible } from '../../features/shop/shopSlice';

function CartDeleteModal({item}) {
  const dispatch = useDispatch();
  const { height, width } = useWindowDimensions();
  const productModalCurrentId = useSelector(state => state.shopReducer.value.productModalCurrentId);
  const visible = useSelector(state => state.shopReducer.value.productModalVisible) && productModalCurrentId === item.id;

  const onDelete = () => {
    dispatch(deleteCartItem(item.id));
    dispatch(setProductModalVisible(false));
  }

  const onCancel = () => {
    dispatch(setProductModalVisible(false));
  }

  return(
    <Modal
      visible={visible}
      style={stylesCartDeleteModal.modal}
      transparent={true}
    >
      <View style={stylesCartDeleteModal.modalContainer}>
        <View style={stylesCartDeleteModal.modalBody}>
          <View>
            <Text style={width < DisplaySizes.minWidth ? stylesCartDeleteModal.modalDetailMin : stylesCartDeleteModal.modalDetail}>
              ¿Desea eliminar el producto '{item.product.title}'?
            </Text>
          </View>
          <View style={stylesCartDeleteModal.modalActions}>
            <Pressable onPress={onDelete} style={stylesCartDeleteModal.modalDeleteButton}>
              <Text style={width < DisplaySizes.minWidth ? stylesCartDeleteModal.modalDeleteButtonTextMin : stylesCartDeleteModal.modalDeleteButtonText}>
                Eliminar
              </Text>
            </Pressable>
            <Pressable onPress={onCancel} style={stylesCartDeleteModal.modalCancelButton}>
              <Text style={width < DisplaySizes.minWidth ? stylesCartDeleteModal.modalCancelButtonTextMin : stylesCartDeleteModal.modalCancelButtonText}>
                Cancelar
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const stylesCartDeleteModal = StyleSheet.create({
  modal: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.black40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalBody: {
    margin: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalDetail: {
    paddingVertical: 20,
    paddingHorizontal: 5,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Noto'
  },
  modalDetailMin: {
    paddingVertical: 15,
    paddingHorizontal: 3,
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'Noto'
  },
  modalActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalDeleteButton: {
    height: 35,
    padding: 5,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: Colors.grayLight,
  },
  modalDeleteButtonText: {
    fontWeight: '600',
    fontSize: 20,
  },
  modalDeleteButtonTextMin: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalCancelButton: {
    height: 35,
    padding: 5,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: Colors.grayLight,
  },
  modalCancelButtonText: {
    fontWeight: '600',
    fontSize: 20,
  },
  modalCancelButtonTextMin: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CartDeleteModal;