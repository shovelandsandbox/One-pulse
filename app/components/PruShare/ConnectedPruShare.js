import { connect } from "react-redux";
import PruShare from "../PruShare";
const mapStateToProps = state => ({
  userAgent: state.auth.userAgent,
});

export default connect(mapStateToProps, {
  goToScreen: (screen, payload) => ({
    type: "GO_TO_SCREEN",
    navigateTo: screen,
    payload,
  }),
})(PruShare);
