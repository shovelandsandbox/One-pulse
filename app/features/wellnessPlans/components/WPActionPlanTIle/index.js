import React from "react";
import { Image, View, Text } from "react-native";
import { pathOr } from "ramda";
import moment from "moment";

import MetaConstants from "../../meta";
import { getHabitDetails } from "../../utils";
import {
  WPImage,
  WPTitle,
  WPDescription,
  WPPlanFooter
} from "../../components";

import { WELLNESS_REWARD } from "../../../../config/images";

const ActionPlanTile = props => {
  const { actionPlan, onJoin, showWellnessModalInDetail, inModal } = props;
  const imageUrl = pathOr(
    "",
    ["icons", "badge", "tags", "600*600"],
    actionPlan
  );
  const status = actionPlan.status;
  const habits = pathOr([], ["actionPlan", "habits"], actionPlan);
  const metaConstants = { ...MetaConstants.screenMeta() };

  return (
    <View
      style={[
        {
          backgroundColor: "#FFFFFF",
          borderRadius: 3.3,
          height: "auto",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,

          elevation: 9
        },
        !inModal && { marginBottom: 17 }
      ]}
    >
      <WPImage mainImage={imageUrl} />
      <View style={{ padding: 23.3 }}>
        <WPTitle
          title={getHabitDetails(actionPlan, "name")}
          locked={status === "LOCKED"}
          inProgress={status === "ACTIVE"}
          isCompleted={status === "COMPLETED"}
        />
        <View style={{ marginTop: 8 }}>
          <WPDescription
            description={getHabitDetails(actionPlan, "desc")}
            numberOfLines={inModal ? null : 3}
            action={() => {
              if (!inModal) {
                showWellnessModalInDetail(actionPlan.id);
              }
            }}
            habits={status === "COMPLETED" ? [] : habits}
            inModal={inModal}
            totalHabits={actionPlan.habitCount}
            badges={actionPlan.earnReward.units}
            continueAction={() => onJoin(actionPlan.id)}
          />
        </View>
        {inModal && status === "LOCKED" && (
          <>
            <View
              style={{
                marginTop: 12,
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 11.3,
                    color: "#2d2d2d"
                  }}
                >
                  {metaConstants.you_need}{" "}
                </Text>
              </View>
              <View>
                <Image
                  source={WELLNESS_REWARD}
                  style={{ height: 20, width: 20 }}
                />
              </View>
              <View>
                <Text
                  style={{
                    fontWeight: "900",
                    color: "#ffffff",
                    fontSize: 11.3,
                    color: "#2d2d2d"
                  }}
                >
                  {actionPlan.earnReward.units} {metaConstants.badges}{" "}
                </Text>
              </View>
              <View style={{ flexWrap: "wrap" }}>
                <Text style={{ fontSize: 11.3, color: "#2d2d2d" }}>
                  upon completion of
                </Text>
              </View>
            </View>
            <View>
              <Text style={{ fontSize: 11.3, color: "#2d2d2d" }}>
                this goal
              </Text>
            </View>
          </>
        )}
        {inModal && status === "COMPLETED" && (
          <View style={{ marginTop: 12 }}>
            <Text
              style={{
                fontSize: 11.3,
                lineHeight: 15,
                color: "#2d2d2d",
                marginTop: 6
              }}
            >
              {metaConstants.complete_goal_on}{" "}
              {moment(actionPlan.completedDate).format("DD-MM-YYYY")}
            </Text>
          </View>
        )}
        {(status !== "ACTIVE" ||
          (status === "ACTIVE" && habits.length === 0)) && (
          <View style={{ marginTop: 31 }}>
            <WPPlanFooter
              status={status}
              badges={actionPlan.earnReward.units}
              action={() => onJoin(actionPlan.id)}
              inModal={inModal}
              unlockRewards={
                actionPlan.unlockReward && actionPlan.unlockReward.units
              }
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default ActionPlanTile;
