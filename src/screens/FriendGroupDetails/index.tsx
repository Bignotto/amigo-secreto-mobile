import { useAuth } from "@clerk/clerk-expo";
import AppAvatar from "@components/AppAvatar";
import AppIconButton from "@components/AppIconButton";
import AppLogo from "@components/AppLogo";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import Header from "@components/Header";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import supabase from "@services/supabase";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { FriendsGroup } from "src/@types/FriendsGroup";
import { GroupFriendsList } from "src/@types/GroupFriendsList";
import { useTheme } from "styled-components";
import {
  AvatarWrapper,
  ControlWrapper,
  FriendCard,
  FriendsListWrapper,
  GroupDetailsWrapper,
  GroupInfoWrapper,
  IconWrapper,
  InfoWrapper,
  NameWrapper,
} from "./styles";

type FriendGroupDetailsParams = {
  groupId: number;
};

export default function FriendGroupDetails() {
  const route = useRoute();
  const { groupId } = route.params as FriendGroupDetailsParams;
  const theme = useTheme();
  const { userId } = useAuth();

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
      <AppSpacer verticalSpace="xlg" />
      <FriendsListWrapper>
        {userList.length > 0 &&
          userList.map((user) => (
            <View key={user.user_id}>
              <FriendCard>
                <AvatarWrapper>
                  <AppAvatar imagePath={user.image_url} size={24} />
                </AvatarWrapper>
                <NameWrapper>
                  <AppText>{user.user_name}</AppText>
                  <AppSpacer horizontalSpace="sm" />
                  {group?.group_owner_id === user.user_id && (
                    <MaterialCommunityIcons
                      name="shield-crown"
                      size={20}
                      color="yellow"
                    />
                  )}
                </NameWrapper>
                <ControlWrapper>
                  {userId === group?.group_owner_id && (
                    <AppIconButton>
                      <FontAwesome5
                        name="times-circle"
                        size={24}
                        color={theme.colors.negative}
                      />
                    </AppIconButton>
                  )}
                </ControlWrapper>
              </FriendCard>
              <AppSpacer verticalSpace="sm" />
            </View>
          ))}
      </FriendsListWrapper>
    </AppScreenContainer>
  );
}
