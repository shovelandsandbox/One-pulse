//#region IMPORTS

// PACKAGE IMPORTS
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// COMPONENT IMPORTS
import { SuccessModal as SuccessModalContainer } from "../../components/containers";

const modalComingSoonMeta = (meta, type) => {
  const items = meta.find(item => item.key === type);
  return items === undefined ? type : items.label;
};
//#endregion

class ComingSoon extends Component {
  //#region CLASS FUNCTIONS

  onConfirm() {
    if (this.props.onConfirm) {
      this.props.onConfirm();
    }
  }

  //#endregion

  render() {
    const { meta } = this.props;
    return (
      <SuccessModalContainer
        inverse
        isActive={this.props.isActive}
        title={modalComingSoonMeta(meta.metaDetail.commons, "comingsoontitle")}
        image={"coming_soon"}
        message={modalComingSoonMeta(meta.metaDetail.commons, "comingsoondesc")}
        buttonLabel={modalComingSoonMeta(meta.metaDetail.commons, "comingsoonbutton")}
        onConfirm={() => this.onConfirm()}
        floatingHeader
      />
    );
  }
}

ComingSoon.propTypes = {
  onConfirm: PropTypes.func,
  isActive: PropTypes.bool,
};

const mapStateToProps = state => ({
  meta: state.meta
})

export default connect(mapStateToProps)(ComingSoon)
