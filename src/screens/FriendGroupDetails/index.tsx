import AppLogo from "@components/AppLogo";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import Header from "@components/Header";
import { useRoute } from "@react-navigation/native";
import React from "react";

type FriendGroupDetailsParams = {
  groupId: number;
};

export default function FriendGroupDetails() {
  const route = useRoute();
  const { groupId } = route.params as FriendGroupDetailsParams;
  return (
    <AppScreenContainer>
      <Header />
      <AppLogo />
      <AppSpacer verticalSpace="lg" />
      <AppText>This is Group Details Page</AppText>
      <AppText>{groupId}</AppText>
    </AppScreenContainer>
  );
}
