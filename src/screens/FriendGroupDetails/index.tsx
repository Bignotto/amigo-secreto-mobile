import { useAuth } from "@clerk/clerk-expo";
import AppAvatar from "@components/AppAvatar";
import AppButton from "@components/AppButton";
import AppIconButton from "@components/AppIconButton";
import AppInput from "@components/AppInput";
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
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import supabase from "@services/supabase";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
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
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

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
    setIsLoading(true);
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

  async function confirmDeleteGroup() {
    return Alert.alert(
      `Apagar grupo ${group?.title}`,
      `Tem certeza que quer apagar o grupo?`,
      [
        {
          text: "Sim",
          onPress: handleDeleteGroup,
        },
        {
          text: "Não",
        },
      ]
    );
  }

  async function handleDeleteGroup() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("user_friends_group")
        .delete()
        .eq("friends_group_id", groupId);
      if (error) {
        console.log({ error });
        return;
      }

      const { data: data_group, error: error_group } = await supabase
        .from("friends_groups")
        .delete()
        .eq("id", groupId);
      if (error_group) {
        console.log({ error_group });
        return;
      }

      navigation.goBack();
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  }

  function drawGroup(friends: string[]) {
    const toShuffle = [...friends];

    let shuffleCount = 10;
    while (shuffleCount !== 0) {
      for (let i = toShuffle.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [toShuffle[i], toShuffle[j]] = [toShuffle[j], toShuffle[i]];
      }

      for (let i = 0; i < toShuffle.length; i++) {
        if (friends[i] === toShuffle[i]) {
          shuffleCount--;
          break;
        }
      }
    }

    if (shuffleCount === 0) {
      const move = Math.floor(Math.random() * (friends.length - 2 + 1) + 1);
      return moveItemsAhead(friends, move);
    }

    return toShuffle;
  }

  function moveItemsAhead(array: string[], positions: number): string[] {
    const length = array.length;
    const startIndex = length - (positions % length);
    const movedItems = array
      .slice(startIndex)
      .concat(array.slice(0, startIndex));

    return movedItems;
  }

  async function handleDrawGroup() {
    if (userList.length <= 3) {
      Alert.alert("É preciso de pelo menos três amigos para sortear o grupo.");
      return;
    }

    setIsLoading(true);
    const friendsIds = userList.map((u) => u.user_id);
    const shuffleFriends = drawGroup(friendsIds);

    for (let i = 0; i < friendsIds.length; i++) {
      if (friendsIds[i] === shuffleFriends[i]) {
        console.log("algo deu errado");
        return;
      }
    }

    const upsertData: {
      id: number;
      user_id: string;
      friends_group_id: number;
      drawnFriendId: string;
    }[] = [];
    userList.map((u, i) => {
      upsertData.push({
        id: u.join_code,
        user_id: u.user_id,
        friends_group_id: groupId,
        drawnFriendId: shuffleFriends[i],
      });
    });

    try {
      const { data: upsert, error: error_upsert } = await supabase
        .from("user_friends_group")
        .upsert(upsertData);
      if (error_upsert) {
        console.log({ error_upsert });
        return;
      }

      const { data, error } = await supabase
        .from("friends_groups")
        .update({ drawn: true, draw_date: new Date() })
        .eq("id", groupId);

      if (error) {
        console.log({ error });
        return;
      }

      await loadGroupInfo();
      await loadGroupFriends();
    } catch (error) {
      console.log({ error });
      return;
    } finally {
      setIsLoading(false);
    }
  }

  const hasUser = userList.find((user) => user.user_id === userId);

  useEffect(() => {
    loadGroupInfo();
    loadGroupFriends();
  }, []);

  return (
    <AppScreenContainer header={<Header />}>
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
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          {group?.group_owner_id === userId && !group?.drawn && (
            <AppButton
              title="Sortear grupo!"
              variant="positive"
              onPress={handleDrawGroup}
            />
          )}
          {group?.drawn && (
            <AppButton
              title="Meu amigo secreto"
              onPress={() =>
                navigation.navigate("DrawFriendDetails", {
                  joinId: hasUser?.join_code ?? 0,
                })
              }
            />
          )}
          <AppSpacer verticalSpace="xlg" />
          {!hasUser || isLoading ? (
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
                            userId !== user.user_id &&
                            !group?.drawn && (
                              <AppIconButton
                                onPress={() =>
                                  confirmExcludeUser(
                                    user.user_name,
                                    user.join_code
                                  )
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
            </>
          )}
          {!group?.drawn && (
            <BottomWrapper>
              {userId === group?.group_owner_id ? (
                <AppButton
                  title="Apagar grupo"
                  variant="negative"
                  onPress={confirmDeleteGroup}
                  isLoading={isLoading}
                  leftIcon={
                    <Ionicons
                      name="trash"
                      size={24}
                      color={theme.colors.white}
                    />
                  }
                />
              ) : (
                <AppButton
                  title="Sair do grupo"
                  variant="negative"
                  onPress={confirmGroupLeave}
                  isLoading={isLoading}
                  rightIcon={
                    <MaterialCommunityIcons
                      name="logout"
                      size={24}
                      color={theme.colors.white}
                    />
                  }
                />
              )}
            </BottomWrapper>
          )}
        </>
      )}
    </AppScreenContainer>
  );
}
