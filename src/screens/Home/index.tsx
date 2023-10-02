import { useAuth, useUser } from "@clerk/clerk-expo";
import AppScreenContainer from "@components/AppScreenContainer";
import Header from "@components/Header";
import ProfileCompleteCard from "@components/ProfileCompleteCard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import supabase from "@services/supabase";
import { useEffect, useState } from "react";

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const { isSignedIn, isLoaded, signOut } = useAuth();
  const { user } = useUser();

  const [profileComplete, setProfileComplete] = useState(0);
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    async function loadProfile() {
      try {
        let { data, error } = await supabase
          .from("users")
          .select()
          .eq("email", user?.primaryEmailAddress?.emailAddress);
        console.log({ data });
        if (error) {
          console.log({ error });
          return;
        }

        if (data?.length === 0) {
          setProfileComplete(0);
          return;
        }
      } catch (error) {}
    }
    if (isSignedIn) loadProfile();
  }, [isSignedIn]);

  return (
    <AppScreenContainer>
      <Header />
      <ProfileCompleteCard
        avatarUrl={`${user?.imageUrl}`}
        userName={`${user?.fullName}`}
        percentCompeted={0}
      />
    </AppScreenContainer>
  );
}
