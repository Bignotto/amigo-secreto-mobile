import AppScreenContainer from "@components/AppScreenContainer";
import AppText from "@components/AppText";
import { useRoute } from "@react-navigation/native";
import React from "react";

type DrawFriendDetailsParams = {
  joinId: number;
};

export default function DrawFriendDetails() {
  const route = useRoute();
  const { joinId } = route.params as DrawFriendDetailsParams;
  return (
    <AppScreenContainer>
      <AppText>Drawn friend details screen for join {joinId}</AppText>
    </AppScreenContainer>
  );
}
