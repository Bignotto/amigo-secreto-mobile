import AppIconButton from "@components/AppIconButton";
import { IconButton } from "@components/AppIconButton/styles";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import Header from "@components/Header";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import supabase from "@services/supabase";
import moment from "moment";
import React, { useState } from "react";
import { Alert } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { FriendsGroup } from "src/@types/FriendsGroup";
import { useTheme } from "styled-components/native";
import {
  GroupLeft,
  GroupMiddle,
  GroupRight,
  IconWrapper,
  InputComponent,
  SearchInputContainer,
  SearchResultItem,
  SearchResultsContainer,
} from "./styles";

export default function SearchGroup() {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<FriendsGroup[]>([]);
  const [searched, setSearched] = useState(false);

  async function handleSearch() {
    const canSearch = searchText.length >= 3;

    if (!canSearch) {
      Alert.alert("O texto de busca precisa ser maior que 3 caracteres.");
      return;
    }

    setSearched(true);

    try {
      const { data, error } = await supabase
        .from("friends_groups")
        .select()
        .ilike("title", `%${searchText}%`)
        .eq("drawn", false);
      if (error) {
        console.log({ error });
        return;
      }
      setSearchResults(data);
    } catch (error) {}
  }

  return (
    <AppScreenContainer
      header={
        <>
          <Header />
          <AppSpacer verticalSpace="xlg" />
          <AppText size="lg" bold color={theme.colors.white}>
            Procure por um grupo de amigo secreto:
          </AppText>
          <AppSpacer verticalSpace="sm" />
          <SearchInputContainer>
            <InputComponent
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
              onSubmitEditing={handleSearch}
            />
            <IconWrapper>
              <IconButton onPress={handleSearch}>
                <FontAwesome5 name="search" size={24} color="black" />
              </IconButton>
            </IconWrapper>
          </SearchInputContainer>
        </>
      }
    >
      <AppSpacer verticalSpace="xlg" />
      {searched && (
        <>
          <AppText>
            Encontrados {searchResults.length} grupos procurando por "
            {searchText}
            ".
          </AppText>
          <AppSpacer />
        </>
      )}
      <SearchResultsContainer>
        {searchResults.length > 0 &&
          searchResults.map((group) => (
            <RectButton
              key={group.id}
              onPress={() =>
                navigation.navigate("FriendGroupDetails", {
                  groupId: group.id,
                })
              }
            >
              <SearchResultItem key={group.id}>
                <GroupLeft>
                  {group.drawn ? (
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
                    {group.title}
                  </AppText>
                  <AppText color={theme.colors.white}>
                    criado em: {moment(group.created_at).format("DD/MM/yyyy")}
                  </AppText>
                </GroupMiddle>
                <GroupRight>
                  <AppIconButton
                    onPress={() =>
                      navigation.navigate("FriendGroupDetails", {
                        groupId: group.id,
                      })
                    }
                  >
                    <FontAwesome5
                      name="arrow-right"
                      size={24}
                      color={theme.colors.white}
                    />
                  </AppIconButton>
                </GroupRight>
              </SearchResultItem>
            </RectButton>
          ))}
      </SearchResultsContainer>
    </AppScreenContainer>
  );
}
