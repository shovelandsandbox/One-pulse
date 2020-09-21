import { StyleSheet } from 'react-native';
import { getLineHeight } from "../../../../utils/StyleUtils";

export default StyleSheet.create({
  detailCell: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomColor: "#f6f6f6",
    borderBottomWidth: 3
  },
  detailCellTextContainer: {
    flexDirection: 'column',
    flex: 3.5,
  },
  detailCellText: {
    fontSize: 14,
    fontFamily: "Avenir-Black",
    color: "#2f2f2f",
    marginTop: 4,
    fontWeight: "500",
    lineHeight: getLineHeight(14),
  },
  detailCellSubText: {
    fontSize: 10,
    color: "#2f2f2f",
    marginTop: 3,
    fontFamily: "Avenir-Book",
    lineHeight: getLineHeight(10),
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1.5,
    justifyContent: "flex-end",
  },
  badgeContainerText: {
    color: "#ed1b2e",
    fontSize: 12.7,
    lineHeight: getLineHeight(12.7),
  },
  imageBadge: {
    height: 25,
    width: 25,
  },
  imageVoucher: {
    height: 40,
    width: 40,
  },
  defaultVoucherIcon: {
    height: 25,
    width: 33,
  },
  imageTranType: {
    height: 35,
    width: 35,
    marginTop: 5
  },
  badgeCreditText: {
    color: "#217e00",
    fontSize: 12.7,
    marginLeft: 5,
    lineHeight: getLineHeight(12.7),
  },
  badgeDebitText: {
    color: "#ed1b2e",
    marginLeft: 5,
    fontSize: 12.7,
    lineHeight: getLineHeight(12.7),
  },
  subTextView: { alignItems: "center", flexDirection: "row" },
  noOfBadgeStyle: {
    color: "#2f2f2f",
    fontSize: 15,
    marginLeft: 5,

    fontFamily: "Avenir-Black",
    lineHeight: getLineHeight(12.7),
  },
});
