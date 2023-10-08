import { useUser } from "@clerk/clerk-expo";
import AppIconButton from "@components/AppIconButton";
import AppText from "@components/AppText";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import React from "react";
import { useTheme } from "styled-components";
import { GroupLeft, GroupMiddle, GroupRight, GroupWrapper } from "./styles";

type FriendGroupCardProps = {
  groupId: number;
  groupName: string;
  friendsCount: number;
  isDrawn: boolean;
};
export default function FriendGroupCard({
  groupId,
  groupName,
  friendsCount = 1,
  isDrawn = false,
}: FriendGroupCardProps) {
  const { user } = useUser();
  const theme = useTheme();

  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  return (
    <GroupWrapper>
      <GroupLeft>
        {isDrawn ? (
          <FontAwesome5
            name="check-circle"
            size={36}
            color={theme.colors.white}
          />
        ) : (
          <FontAwesome5
            name="question-circle"
            size={36}
            color={theme.colors.white}
          />
        )}
      </GroupLeft>
      <GroupMiddle>
        <AppText bold size="lg" color={theme.colors.white}>
          {groupName}
        </AppText>
        <AppText color={theme.colors.white}>{friendsCount} amigos</AppText>
      </GroupMiddle>
      <GroupRight>
        <AppIconButton
          onPress={() => navigation.navigate("FriendGroupDetails", { groupId })}
        >
          <FontAwesome5
            name="arrow-right"
            size={24}
            color={theme.colors.white}
          />
        </AppIconButton>
      </GroupRight>
    </GroupWrapper>
  );
}
