import { useUser } from "@clerk/clerk-expo";
import AppAvatar from "@components/AppAvatar";
import AppText from "@components/AppText";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { useTheme } from "styled-components";
import { GroupLeft, GroupMiddle, GroupRight, GroupWrapper } from "./styles";

type FriendGroupCardProps = {
  groupName: string;
  friendsCount: number;
};
export default function FriendGroupCard({
  groupName,
  friendsCount,
}: FriendGroupCardProps) {
  const { user } = useUser();
  const theme = useTheme();

  return (
    <GroupWrapper>
      <GroupLeft>
        <AppAvatar imagePath={`${user?.imageUrl}`} size={40} />
      </GroupLeft>
      <GroupMiddle>
        <AppText bold size="lg" color={theme.colors.white}>
          {groupName}
        </AppText>
        <AppText color={theme.colors.white}>{friendsCount} amigos</AppText>
      </GroupMiddle>
      <GroupRight>
        <FontAwesome5 name="arrow-right" size={24} color={theme.colors.white} />
      </GroupRight>
    </GroupWrapper>
  );
}
