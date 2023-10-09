import AppLogo from "@components/AppLogo";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import Header from "@components/Header";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import supabase from "@services/supabase";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FriendsGroup } from "src/@types/FriendsGroup";
import { GroupFriendsList } from "src/@types/GroupFriendsList";
import { useTheme } from "styled-components";
import {
  GroupDetailsWrapper,
  GroupInfoWrapper,
  IconWrapper,
  InfoWrapper,
} from "./styles";

type FriendGroupDetailsParams = {
  groupId: number;
};

export default function FriendGroupDetails() {
  const route = useRoute();
  const { groupId } = route.params as FriendGroupDetailsParams;
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(true);
  const [group, setGroup] = useState<FriendsGroup>();
  const [userList, setUserList] = useState<GroupFriendsList[]>([]);

  async function loadGroupInfo() {
    try {
      const { data, error } = await supabase
        .from("friends_groups")
        .select("*")
        .eq("id", groupId);

      if (error) {
        console.log({ error });
        return;
      }

      if (data.length === 0) {
        console.log(`no group found with id ${groupId}`);
      }
      setGroup(data[0]);
      setIsLoading(false);
    } catch (error) {
      console.log({ error });
    }
  }

  async function loadGroupFriends() {
    try {
      const { data, error } = await supabase
        .from("group_friends_list")
        .select("*")
        .eq("friends_group_id", groupId);
      if (error) {
        console.log({ error });
        return;
      }

      if (data.length === 0) {
        console.log(`no users found in group with id ${groupId}`);
        return;
      }

      //NEXT: deal with user list!!
      console.log({ data });
      setUserList(data);
      setIsLoading(false);
    } catch (error) {
      console.log({ error });
    }
  }

  useEffect(() => {
    loadGroupInfo();
    loadGroupFriends();
  }, []);

  return (
    <AppScreenContainer>
      <Header />
      <AppLogo />
      <AppSpacer verticalSpace="lg" />
      <GroupDetailsWrapper>
        <GroupInfoWrapper>
          <IconWrapper>
            <FontAwesome5 name="gift" size={24} color={theme.colors.white} />
          </IconWrapper>
          <InfoWrapper>
            <AppText size="xlg" color={theme.colors.white} bold>
              {isLoading ? `...` : group?.title}
            </AppText>
          </InfoWrapper>
        </GroupInfoWrapper>
        <AppSpacer verticalSpace="xlg" />
        <GroupInfoWrapper>
          <IconWrapper>
            <Ionicons name="pricetag" size={24} color={theme.colors.white} />
          </IconWrapper>
          <InfoWrapper>
            <AppText size="xlg" color={theme.colors.white}>
              {isLoading ? `...` : `R$ ${group?.average_gift_price}`}
            </AppText>
          </InfoWrapper>
        </GroupInfoWrapper>
        <AppSpacer verticalSpace="xlg" />
        <GroupInfoWrapper>
          <IconWrapper>
            <FontAwesome5
              name="calendar-alt"
              size={24}
              color={theme.colors.white}
            />
          </IconWrapper>
          <InfoWrapper>
            <AppText size="xlg" color={theme.colors.white}>
              {isLoading
                ? `...`
                : `${moment(group?.party_date).format("DD/MM/yyyy")}`}
            </AppText>
          </InfoWrapper>
        </GroupInfoWrapper>
        <AppSpacer verticalSpace="xlg" />
        <GroupInfoWrapper>
          <IconWrapper>
            <FontAwesome5 name="clock" size={24} color={theme.colors.white} />
          </IconWrapper>
          <InfoWrapper>
            <AppText size="xlg" color={theme.colors.white}>
              {isLoading ? `...` : group?.party_time}
            </AppText>
          </InfoWrapper>
        </GroupInfoWrapper>
        <AppSpacer verticalSpace="xlg" />
        <GroupInfoWrapper>
          <IconWrapper>
            <FontAwesome5
              name="map-marker-alt"
              size={24}
              color={theme.colors.white}
            />
          </IconWrapper>
          <InfoWrapper>
            <AppText size="xlg" color={theme.colors.white}>
              {isLoading ? `...` : group?.party_location}
            </AppText>
          </InfoWrapper>
        </GroupInfoWrapper>
      </GroupDetailsWrapper>
    </AppScreenContainer>
  );
}
