import { useAuth } from "@clerk/clerk-expo";
import AppAvatar from "@components/AppAvatar";
import AppButton from "@components/AppButton";
import AppIconButton from "@components/AppIconButton";
import AppInput from "@components/AppInput";
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
import {
  CommonActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import supabase from "@services/supabase";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { FriendsGroup } from "src/@types/FriendsGroup";
import { GroupFriendsList } from "src/@types/GroupFriendsList";
import { useTheme } from "styled-components";
import {
  AvatarWrapper,
  BottomWrapper,
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
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [group, setGroup] = useState<FriendsGroup>();
  const [userList, setUserList] = useState<GroupFriendsList[]>([]);
  const [groupPassword, setGroupPassword] = useState("");

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

  async function handleJoinGroup() {
    if (groupPassword.length === 0) return;
    if (groupPassword !== group?.group_password) {
      Alert.alert("Senha incorreta");
      return;
    }

    try {
      const { data, error } = await supabase.from("user_friends_group").insert([
        {
          user_id: userId,
          friends_group_id: group.id,
        },
      ]);
      if (error) {
        console.log(JSON.stringify(error));
        return;
      }

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: "Home",
            },
          ],
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLeaveGroup() {
    try {
      const { data, error } = await supabase
        .from("user_friends_group")
        .delete()
        .eq("id", hasUser?.join_code);
      if (error) {
        console.log({ error });
        return;
      }

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: "Home",
            },
          ],
        })
      );
    } catch (error) {
      console.log({ error });
    }
  }

  async function confirmGroupLeave() {
    return Alert.alert(
      `Sair de ${group?.title}`,
      `Tem certeza que quer sair do grupo?`,
      [
        {
          text: "Sim",
          onPress: handleLeaveGroup,
        },
        {
          text: "Não",
        },
      ]
    );
  }

  async function handleExcludeUser(joinCode: number) {
    try {
      const { data, error } = await supabase
        .from("user_friends_group")
        .delete()
        .eq("id", joinCode);
      if (error) {
        console.log({ error });
        return;
      }
    } catch (error) {
      console.log({ error });
    }
    await loadGroupFriends();
  }

  async function confirmExcludeUser(userName: string, joinCode: number) {
    return Alert.alert(
      `Remover ${userName}`,
      `Tem certeza que quer remover o usuário do grupo?`,
      [
        {
          text: "Sim",
          onPress: () => handleExcludeUser(joinCode),
        },
        {
          text: "Não",
        },
      ]
    );
  }

  const hasUser = userList.find((user) => user.user_id === userId);

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
      {!hasUser ? (
        <>
          <AppText>
            Entre com a senha enviada pelo criador do grupo para entrar!
          </AppText>
          <AppSpacer />
          <AppInput
            placeholder="senha"
            value={groupPassword}
            onChangeText={(text) => setGroupPassword(text)}
          />
          <AppSpacer />
          <AppButton
            title="Entrar no grupo!"
            variant="positive"
            onPress={handleJoinGroup}
          />
        </>
      ) : (
        <>
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
                      {userId === group?.group_owner_id &&
                        userId !== user.user_id && (
                          <AppIconButton
                            onPress={() =>
                              confirmExcludeUser(user.user_name, user.join_code)
                            }
                          >
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
          <AppSpacer />
          <BottomWrapper>
            <AppButton
              title="Sair do grupo"
              variant="negative"
              onPress={confirmGroupLeave}
            />
          </BottomWrapper>
        </>
      )}
    </AppScreenContainer>
  );
}
