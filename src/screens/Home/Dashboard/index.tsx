import { useAuth, useUser } from "@clerk/clerk-expo";
import AppButton from "@components/AppButton";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import FriendGroupCard from "@components/FriendGroupCard";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import supabase from "@services/supabase";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { UserGroups } from "src/@types/UserGroups";
import { useTheme } from "styled-components";
import { BottomContainer, Container, GroupList, TopWrapper } from "./styles";

export default function Dashboard() {
  const { userId } = useAuth();
  const { user } = useUser();

  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(true);
  const [userGroups, setUserGroups] = useState<UserGroups[]>([]);

  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  async function loadUserGroups() {
    try {
      let { data, error } = await supabase
        .from("user_groups")
        .select("*")
        .eq("user_id", userId);
      if (error) {
        console.log({ error, key: error.details });
        return;
      }
      if (data) setUserGroups(data);
      setIsLoading(false);
    } catch (error) {
      console.log({ error });
    }
  }

  useEffect(() => {
    loadUserGroups();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadUserGroups();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <TopWrapper>
            <AppText bold>Você tem {userGroups?.length ?? 0} grupos</AppText>
            <AppButton
              title="Criar novo grupo"
              size="sm"
              variant="solid"
              onPress={() => navigation.navigate("CreateFriendGroup")}
              rightIcon={
                <>
                  <Ionicons
                    name="add-sharp"
                    size={24}
                    color={theme.colors.white}
                  />
                  <AppSpacer horizontalSpace="md" />
                </>
              }
            />
          </TopWrapper>
          <AppSpacer verticalSpace="xlg" />
          <GroupList>
            {userGroups?.length > 0 &&
              userGroups.map((group) => (
                <RectButton
                  key={group.group_id}
                  onPress={() =>
                    navigation.navigate("FriendGroupDetails", {
                      groupId: group.group_id,
                    })
                  }
                >
                  <FriendGroupCard
                    groupName={group.group_title}
                    friendsCount={group.friends_count}
                    key={group.group_id}
                    groupId={group.group_id}
                    isDrawn={group.drawn}
                  />
                </RectButton>
              ))}
          </GroupList>
          <BottomContainer>
            <AppButton
              title="Encontrar um grupo"
              onPress={() => navigation.navigate("SearchGroup")}
              leftIcon={
                <Ionicons
                  name="ios-search"
                  size={24}
                  color={theme.colors.white}
                />
              }
            />
          </BottomContainer>
        </>
      )}
    </Container>
  );
}
