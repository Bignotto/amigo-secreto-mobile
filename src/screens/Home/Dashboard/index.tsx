import { useAuth } from "@clerk/clerk-expo";
import AppButton from "@components/AppButton";
import AppText from "@components/AppText";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import supabase from "@services/supabase";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { FriendsGroup } from "src/@types/FriendsGroup";
import { Container, TopWrapper } from "./styles";

export default function Dashboard() {
  const { userId } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [userGroups, setUserGroups] = useState<FriendsGroup[]>();

  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  async function loadUserGroups() {
    let { data, error } = await supabase
      .from("user_friends_group")
      .select("*,friends_groups(*)")
      .eq("user_id", userId);
    if (error) {
      console.log({ error, key: error.details });
      return;
    }

    const groups = data?.map((group) => group.friends_groups);
    setUserGroups(groups);
    setIsLoading(false);
  }

  useEffect(() => {
    loadUserGroups();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <TopWrapper>
          <AppText bold>Você tem {userGroups?.length} grupos</AppText>
          <AppButton
            title="Criar novo grupo"
            size="sm"
            variant="solid"
            onPress={() => navigation.navigate("CreateFriendGroup")}
          />
        </TopWrapper>
      )}
    </Container>
  );
}
