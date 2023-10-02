import { useAuth, useUser } from "@clerk/clerk-expo";
import AppScreenContainer from "@components/AppScreenContainer";
import Header from "@components/Header";
import ProfileCompleteCard from "@components/ProfileCompleteCard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@routes/Navigation.types";
import supabase from "@services/supabase";
import { useEffect, useState } from "react";
import { UserProfile } from "src/@types/UserProfile";

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const { isSignedIn, isLoaded, signOut, userId } = useAuth();
  const { user } = useUser();

  const [profileComplete, setProfileComplete] = useState(0);
  const [userProfile, setUserProfile] = useState<UserProfile>();

  useEffect(() => {
    async function loadProfile() {
      try {
        let { data, error } = await supabase
          .from("users")
          .select()
          .eq("email", user?.primaryEmailAddress?.emailAddress);
        if (error) {
          console.log({ error });
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
        } else if (data?.length) {
          setUserProfile(data[0]);
          //NEXT: validate filled fields
        }

        let profilePoints = 0;

        console.log({ data });
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
