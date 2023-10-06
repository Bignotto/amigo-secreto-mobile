import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import AppScreenContainer from "@components/AppScreenContainer";
import AppSpacer from "@components/AppSpacer";
import Header from "@components/Header";
import ProfileCompleteCard from "@components/ProfileCompleteCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import supabase from "@services/supabase";
import { useCallback, useEffect, useState } from "react";
import { UserProfile } from "src/@types/UserProfile";
import SignUp from "./SignUp";

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const { isSignedIn, userId } = useAuth();
  const { user } = useUser();

  const [profileComplete, setProfileComplete] = useState(0);

  async function loadUserGroups() {
    let { data, error } = await supabase
      .from("user_friends_group")
      .select("*,friends_groups(*)")
      .eq("user_id", userId);
    if (error) {
      console.log({ error, key: error.details });
      return;
    }
    console.log({ grupos: data?.length });
    console.log({ data, groups: data![0].friends_groups });
    //NEXT: list user groups in home screen
  }

  async function loadProfile() {
    try {
      let { data, error } = await supabase
        .from("users")
        .select()
        .eq("email", user?.primaryEmailAddress?.emailAddress);
      if (error) {
        console.log({ error, key: error.details });
        return;
      }

      if (data?.length === 0 && isSignedIn) {
        let { data, error } = await supabase.from("users").insert([
          {
            id: userId,
            email: user?.primaryEmailAddress?.emailAddress,
            name: user?.fullName,
          },
        ]);
        setProfileComplete(0);

        if (error) console.log({ error });
        return;
      }

      let profilePoints = 0;
      const profile: UserProfile = data![0];
      if (profile.clothesSize) profilePoints += 25;
      if (profile.shoeSize) profilePoints += 25;
      if (profile.likeThings) profilePoints += 25;
      if (profile.dontLikeThings) profilePoints += 25;

      setProfileComplete(profilePoints);
    } catch (error) {}
  }

  useEffect(() => {
    if (isSignedIn) {
      loadProfile();
      loadUserGroups();
    }
  }, [isSignedIn]);

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [])
  );

  return (
    <AppScreenContainer>
      <SignedIn>
        <Header />
        <AppSpacer verticalSpace="xlg" />
        {profileComplete < 100 && (
          <ProfileCompleteCard
            avatarUrl={`${user?.imageUrl}`}
            userName={`${user?.firstName}`}
            percentCompeted={profileComplete}
          />
        )}
      </SignedIn>
      <SignedOut>
        <SignUp />
      </SignedOut>
    </AppScreenContainer>
  );
}
