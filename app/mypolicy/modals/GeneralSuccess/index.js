//#region IMPORTS

// PACKAGE IMPORTS
import React, { PureComponent } from "react";
import PropTypes from "prop-types";

// COMPONENT IMPORTS
import { SuccessModal as SuccessModalContainer } from "../../components/containers";
import { connect } from "react-redux";

//#endregion
const modalMeta = (meta, type) => {
  const items = meta.find(item => item.key === type);
  return items === undefined ? type : items.label;
};

class GeneralSuccess extends PureComponent {
  render() {
    const { meta } = this.props;
    return (
      <SuccessModalContainer
        isActive={this.props.isActive}
        title={modalMeta(meta.metaDetail.commons, "generalsuccess")}
        image={this.props.image}
        message={modalMeta(meta.metaDetail.commons, "generalsuccess")}
        buttonLabel={modalMeta(meta.metaDetail.commons, "generalsuccessbutton")}
        onConfirm={this.props.onConfirm}
        floatingHeader
      />
    );
  }
}

//#region PROP TYPES

GeneralSuccess.propTypes = {
  isActive: PropTypes.bool.isRequired,
  title: PropTypes.string,
  image: PropTypes.string,
  message: PropTypes.string,
  buttonLabel: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
};

//#endregion
const mapStateToProps = state => ({
  meta: state.meta
})

export default connect(mapStateToProps)(GeneralSuccess);
