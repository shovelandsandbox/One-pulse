import { connect } from "react-redux";
import PulseLogo from "../PulseLogo";
const mapStateToProps = state => ({
  country: state.auth.countryInfo.simCountry,
});

export default connect(mapStateToProps, {})(PulseLogo);
