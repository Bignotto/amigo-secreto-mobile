import { useAuth } from "@clerk/clerk-expo";
import AppButton from "@components/AppButton";
import AppInput from "@components/AppInput";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import Header from "@components/Header";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import supabase from "@services/supabase";
import moment from "moment";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { FriendsGroup } from "src/@types/FriendsGroup";
import { useTheme } from "styled-components";
import { validate } from "./formValidation";
import {
  DatePickerWrapper,
  FormContainer,
  FormError,
  TopContainer,
  TwoColumnsWrapper,
} from "./styles";

export default function CreateFriendGroup() {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const { userId } = useAuth();

  const [show, setShow] = useState(false);

  const [title, setTitle] = useState("");
  const [partyDate, setPartyDate] = useState(new Date());
  const [partyTime, setPartyTime] = useState("");
  const [partyLocation, setPartyLocation] = useState("");
  const [giftPrice, setGiftPrice] = useState("");
  const [groupPassword, setGroupPassword] = useState("");
  const [formError, setFormError] = useState<string | undefined>(undefined);

  const [isLoading, setIsLoading] = useState(false);

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    setPartyDate(selectedDate!);
    setShow(false);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  async function handleSaveNewGroup() {
    setIsLoading(true);

    const validation = validate({
      title,
      partyLocation,
      partyTime,
      groupPassword,
      giftPrice,
    });

    if (validation) {
      setFormError(validation);
      setIsLoading(false);
      return;
    }

    if (
      title.length < 3 ||
      partyTime.length < 3 ||
      partyLocation.length < 3 ||
      giftPrice.length === 0 ||
      groupPassword.length < 3
    ) {
      console.log({ message: "algum campo em branco!" });
      setIsLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from("friends_groups")
        .insert([
          {
            title,
            average_gift_price: +giftPrice,
            group_owner_id: userId,
            group_password: groupPassword,
            party_date: partyDate,
            party_location: partyLocation,
            party_time: partyTime,
          },
        ])
        .select("*");
      if (error) {
        console.log({ error, emais: "??" });
        return;
      }
      if (!data) {
        console.log({ message: "cant get group id!" });
        return;
      }

      const group: FriendsGroup = data![0];

      await supabase.from("user_friends_group").insert([
        {
          user_id: userId,
          friends_group_id: group.id,
        },
      ]);

      navigation.goBack();
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <AppScreenContainer
      header={
        <>
          <Header />
          <TopContainer>
            <AppText size="xxlg" bold color={theme.colors.white}>
              Novo grupo
            </AppText>
            <AppSpacer verticalSpace="xlg" />
            <AppText color={theme.colors.white}>
              Preencha as informações abaixo para criar um novo grupo de Amigo
              Secreto.
            </AppText>
          </TopContainer>
        </>
      }
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppSpacer verticalSpace="md" />
        {formError && (
          <FormError>
            <AppText color={theme.colors.negative}>{formError}</AppText>
          </FormError>
        )}
        <AppSpacer verticalSpace="md" />
        <FormContainer>
          <AppInput
            label="Qual vai ser o nome do grupo?"
            placeholder="Grupo da Firma"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <AppSpacer verticalSpace="md" />

          <TwoColumnsWrapper>
            <AppInput
              label="Quando vai ser a revelação?"
              placeholder="23/12/2023"
              editable={false}
              value={`${moment(partyDate).format("DD/MM/yyyy")}`}
            />
            <DatePickerWrapper>
              <AppButton
                title="Data"
                onPress={showDatepicker}
                outline
                leftIcon={
                  <>
                    <AppSpacer />
                    <AntDesign
                      name="calendar"
                      size={24}
                      color={theme.colors.primary}
                    />
                  </>
                }
              />
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={partyDate}
                  is24Hour={true}
                  onChange={onChange}
                />
              )}
            </DatePickerWrapper>
          </TwoColumnsWrapper>
          <AppSpacer verticalSpace="md" />
          <AppInput
            label="Em qual horário?"
            placeholder="Após o expediente"
            value={partyTime}
            onChangeText={(text) => setPartyTime(text)}
          />
          <AppSpacer verticalSpace="md" />
          <AppInput
            label="Onde vai ser a festa?"
            placeholder="Refeitório"
            value={partyLocation}
            onChangeText={(text) => setPartyLocation(text)}
          />
          <AppSpacer verticalSpace="md" />
          <AppInput
            label="Qual o valor dos presentes?"
            placeholder="200"
            keyboardType="numeric"
            value={giftPrice}
            onChangeText={(text) => setGiftPrice(text)}
          />
          <AppSpacer verticalSpace="md" />
          <AppInput
            label="Crie uma senha fácil para seus amigos poderem entrar no grupo"
            placeholder="Senha fácil"
            value={groupPassword}
            onChangeText={(text) => setGroupPassword(text)}
          />
          <AppSpacer verticalSpace="lg" />
          <AppButton
            isLoading={isLoading}
            onPress={handleSaveNewGroup}
            title="Criar grupo!"
            variant="positive"
            leftIcon={
              <MaterialIcons
                name="group-add"
                size={24}
                color={theme.colors.white}
              />
            }
          />
          <AppSpacer verticalSpace="sm" />
          <AppButton
            isLoading={isLoading}
            onPress={() => navigation.goBack()}
            title="Cancelar"
            variant="negative"
            outline
            leftIcon={
              <AntDesign name="back" size={24} color={theme.colors.negative} />
            }
          />
          <AppSpacer verticalSpace="xlg" />
        </FormContainer>
      </ScrollView>
    </AppScreenContainer>
  );
}
