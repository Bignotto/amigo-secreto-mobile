import { useAuth } from "@clerk/clerk-expo";
import AppButton from "@components/AppButton";
import AppInput from "@components/AppInput";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import AppText from "@components/AppText";
import Header from "@components/Header";
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
import { FormContainer } from "./styles";

export default function CreateFriendGroup() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const { userId } = useAuth();

  const [show, setShow] = useState(false);

  const [title, setTitle] = useState("");
  const [partyDate, setPartyDate] = useState(new Date());
  const [partyTime, setPartyTime] = useState("");
  const [partyLocation, setPartyLocation] = useState("");
  const [giftPrice, setGiftPrice] = useState("");
  const [groupPassword, setGroupPassword] = useState("");

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
    if (
      title.length === 0 ||
      partyTime.length === 0 ||
      partyLocation.length === 0 ||
      giftPrice.length === 0 ||
      groupPassword.length === 0
    ) {
      console.log({ message: "algum campo em branco!" });
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
    <AppScreenContainer header={<Header />}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppSpacer verticalSpace="md" />
        <AppText size="xlg">Criar um grupo novo</AppText>
        <AppText>
          Preencha as informações abaixo para criar um novo grupo de Amigo
          Secreto.
        </AppText>
        <AppSpacer verticalSpace="xlg" />
        <FormContainer>
          <AppInput
            label="Qual vai ser o nome do grupo?"
            placeholder="Grupo da Firma"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <AppSpacer verticalSpace="md" />

          <AppInput
            label="Quando vai ser a revelação?"
            placeholder="23/12/2023"
            editable={false}
            value={`${moment(partyDate).format("DD/MM/yyyy")}`}
          />
          <AppButton title="Data" onPress={showDatepicker} />
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={partyDate}
              is24Hour={true}
              onChange={onChange}
            />
          )}
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
            onPress={handleSaveNewGroup}
            title="Criar grupo!"
            variant="positive"
          />
          <AppSpacer verticalSpace="sm" />
          <AppButton
            onPress={() => navigation.goBack()}
            title="Cancelar"
            variant="negative"
          />
          <AppSpacer verticalSpace="xlg" />
        </FormContainer>
      </ScrollView>
    </AppScreenContainer>
  );
}
