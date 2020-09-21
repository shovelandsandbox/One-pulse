import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import images from '../../images';
import styles from './styles';
import Modal from "react-native-modal";


const PruFullPageModal = (props) => {
  const {
    isModalVisible,
    setModalVisibility,
    bgImg,
    RenderContentView,
    closeIcon,
    closeIconStyle,
    closeIconAction,
    closeBtnStyle,
  } = props;

  return (
    <View>
      <Modal isVisible={isModalVisible} coverScreen={true} style={{ margin: 0 }}>
        <View style={styles.container}>
          <Image
            style={styles.bgImg}
            source={bgImg ? bgImg : images.bgImgDefaultModal} />
          <TouchableOpacity
            onPress={() =>
              closeIconAction ? closeIconAction() : setModalVisibility(false)
            }
            style={[styles.closeBtn, closeBtnStyle]}>
            <Image source={closeIcon ? closeIcon : images.close} style={[styles.closeIcon, closeIconStyle]} />
          </TouchableOpacity>
          {RenderContentView}
        </View>
      </Modal>
    </View>
  );
}

PruFullPageModal.propTypes = {
  isModalVisible: PropTypes.bool,
  setModalVisibility: PropTypes.func,
  bgImg: PropTypes.string,
  RenderContentView: PropTypes.element,
  closeIcon: PropTypes.string,
  closeIconStyle: PropTypes.object,
  closeIconAction: PropTypes.func,
  closeBtnStyle: PropTypes.object,
}

PruFullPageModal.defaultProps = {
  isModalVisible: false,
  RenderContentView: <View />,
}

export default PruFullPageModal;