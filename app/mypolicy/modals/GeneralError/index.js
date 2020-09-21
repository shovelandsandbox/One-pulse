import React, { Component } from "react";
import PropTypes from "prop-types";
import { SuccessModal as SuccessModalContainer } from "../../components/containers";
import { connect } from "react-redux";

const modalMeta = (meta, type) => {
  const items = meta.find(item => item.key === type);
  return items === undefined ? type : items.label;
};

class GeneralError extends Component {
  onConfirm() {
    if (this.props.onConfirm) {
      this.props.onConfirm();
    }
  }

  render() {
    const { meta } = this.props;
    return (
      <SuccessModalContainer
        isActive={this.props.isActive}
        onClosePress={() => this.props.onClosePress()}
        title={modalMeta(meta.metaDetail.commons, "generalerrortitle")}
        image={"general_error"}
        message={modalMeta(meta.metaDetail.commons, "generalerrordesc")}
        buttonLabel={modalMeta(meta.metaDetail.commons, "generalerrorbutton")}
        onConfirm={() => this.onConfirm()}
        floatingHeader
      />
    );
  }
}

GeneralError.propTypes = {
  onConfirm: PropTypes.func,
  onClosePress: PropTypes.func,
  isActive: PropTypes.bool,
  errorMessage: PropTypes.string,
  errorTitle: PropTypes.string,
  errorButtonLabel: PropTypes.string,
};

const mapStateToProps = state => ({
  meta: state.meta
})

export default connect(mapStateToProps)(GeneralError)
