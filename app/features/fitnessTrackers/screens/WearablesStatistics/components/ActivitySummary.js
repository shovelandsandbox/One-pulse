import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import styles, { spacing, fontSize } from "../styles";
import colors from "../../../../../themes/default/colors";
import PropTypes from "prop-types";
import metaKeys from "../../../screenMetaKeys";
import { safeMetaLabelFinder } from "../../../../../utils/meta-utils";
import PruScrollIndicator from "../../../../../components/PruScrollIndicator";

const defaultData = [
  {
    unit: "STEPS",
    value: "0",
    name: "Step Counts",
    iconUrl:
      "https://apiuat.pulse.prudentialcorporation-asia.com/api/v1_0_0/cms/e234eea2-7e45-42da-93f1-1da95247edb2?namespace=VN",
  },
  {
    unit: "KCAL",
    value: "0",
    name: "Calories",
    iconUrl:
      "https://apiuat.pulse.prudentialcorporation-asia.com/api/v1_0_0/cms/cbb96b48-f69b-4da1-a850-762ebb89d93d?namespace=VN",
  },
  {
    unit: "KM",
    value: "0.0",
    name: "Cycling",
    iconUrl:
      "https://apiuat.pulse.prudentialcorporation-asia.com/api/v1_0_0/cms/b4079bfc-375f-4ece-984e-23efc368cdcc?namespace=VN",
  },
  {
    unit: "METRES",
    value: "0",
    name: "Swimming",
    iconUrl:
      "https://apiuat.pulse.prudentialcorporation-asia.com/api/v1_0_0/cms/cb3265e6-7c7e-4676-b113-af48daa4796a?namespace=VN",
  },
];

const BORDER_WIDTH = 1;

const ActivityView = ({
  index,
  isLastRow,
  value,
  name,
  unit,
  iconUrl,
  config,
}) => {
  const isOdd = index % 2 !== 0;
  const icon = config.find(item => item.name === name);
  const iconSource = icon ? icon.logo : { uri: iconUrl };

  return (
    <View
      style={{
        ...componentStyles.ACTIVITY_VIEW_CONTAINER(isLastRow, isOdd),
        maxWidth: "50%",
        justifyContent: "space-between",
        margin: 10
      }}
    >
      <View>
        <Text style={{ ...styles.TEXT, ...styles.MUTED_TEXT }}>{name}</Text>
        <Text
          style={{
            ...styles.TEXT,
            ...styles.PRIMARY_TEXT,
            fontSize: fontSize.xLarge,
          }}
        >
          {value}
        </Text>
        <Text style={{ ...styles.TEXT, ...styles.MUTED_TEXT }}>{unit}</Text>
      </View>
      <Image
        source={iconSource}
        style={{ height: "60%" }}
        resizeMode="contain"
      />
    </View>
  );
};

ActivityView.propTypes = {
  index: PropTypes.number,
  isLastRow: PropTypes.boolean,
  value: PropTypes.number,
  unit: PropTypes.string,
  config: PropTypes.array,
  iconUrl: PropTypes.string,
  name: PropTypes.string,
};
function chunkArray(myArray, chunk_size) {
  const results = [];

  while (myArray.length) {
    results.push(myArray.splice(0, chunk_size));
  }

  return results;
}

function renderActivity(data = [], config) {
  const length = data.length;
  return (
    <View style={componentStyles.ACTIVIY_CONTAINER}>
      <FlatList
        data={data}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginStart: spacing.small }}
        renderItem={({ item, index }) => (
          <ActivityView
            {...item}
            index={index}
            config={config}
            isLastRow={index === length - 2 || index === length - 1} //assuming that numColumns will always be 2
          />
        )}
      />
    </View>
  );
}

export const ActivitySummary = ({ data, status, type, config }) => {
  let length = (data || []).length;
  if (status === "ACTIVE" && length === 0) {
    data = defaultData;
  }
  length = (data || []).length;

  const chunkData = chunkArray(data, 4);

  return length !== 0 ? (
    <View style={componentStyles.ACTIVIY_SUMMARY_CONTAINER}>
      {type === "applehealth" && (
        <Text
          style={{
            ...styles.TEXT,
            ...styles.MUTED_TEXT,
            ...styles.DISCLAIMER_TEXT,
          }}
        >
          {safeMetaLabelFinder(
            metaKeys.screenName,
            metaKeys.wearables.supportAppleHealth
          )}
        </Text>
      )}
      <View>
        <Text style={{ ...styles.TEXT, fontSize: fontSize.large }}>
          {safeMetaLabelFinder(
            metaKeys.screenName,
            metaKeys.statistics.yourActivity
          )}
        </Text>
        <FlatList
          data={chunkData}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => renderActivity(item, config, index)}
        />
        <PruScrollIndicator pages={chunkData} index={0} />
      </View>
    </View>
  ) : (
    <View style={componentStyles.TrackersNotConnected}>
      <Text style={componentStyles.TrackersNotConnectedText}>
        {safeMetaLabelFinder(
          metaKeys.screenName,
          metaKeys.statistics.pressIcon
        )}
      </Text>
    </View>
  );
};

ActivitySummary.propTypes = {
  data: PropTypes.array,
  status: PropTypes.string,
  type: PropTypes.string,
};

const componentStyles = StyleSheet.create({
  ACTIVITY_VIEW_CONTAINER: (isLastRow, isOdd) => ({
    flexDirection: "row",
    paddingTop: spacing.base,
    paddingLeft: isOdd ? "8%" : 0,
    paddingRight: isOdd ? 0 : "8%",
    alignItems: "center",
    flex: 1,
    borderColor: "#f9f9f9",
    borderLeftWidth: isOdd ? BORDER_WIDTH : 0,
    borderBottomWidth: isLastRow ? 0 : BORDER_WIDTH,
    paddingBottom: isLastRow ? 0 : spacing.base,
  }),
  ACTIVIY_CONTAINER: {
    padding: spacing.base,
    width: Dimensions.get("window").width - 50,
  },
  ACTIVIY_SUMMARY_CONTAINER: {
    backgroundColor: colors.white,
    borderRadius: 8,
    elevation: 5,
    padding: spacing.base,
    shadowColor: colors.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.34,
    shadowRadius: 8,
  },
  TrackersNotConnected: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  TrackersNotConnectedText: {
    textAlign: "center",
  },
});
