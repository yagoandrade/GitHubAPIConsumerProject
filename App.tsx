import { useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";

import { Toaster, toast } from "sonner";
import axios from "axios";

import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

import Header from "@/components/Header/Header";
import RepositoryList from "@/components/RepositoryList/RepositoryList";

import { Repository } from "@/types/Repository";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [userRepositories, setUserRepositories] = useState<
    Repository[] | null
  >();

  const [fontsLoaded] = useFonts({
    InterRegular: require("@/assets/fonts/Inter-Regular.ttf"),
    InterBold: require("@/assets/fonts/Inter-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  const fetchUser = useCallback((username: string) => {
    const url = `https://api.github.com/users/${username}/repos`;

    axios
      .get<Repository[]>(url)
      .then(({ data }) => {
        // Sort by descending order
        data.sort(
          (a, b) =>
            Number(new Date(b.created_at)) - Number(new Date(a.created_at))
        );

        setUserRepositories(data);
      })
      .catch(() => {
        if (username.length === 0)
          return toast(`Insira um nome de usuário antes de continuar.`);

        toast(`O usuário "${username}" não existe no Github. Tente novamente!`);
      });
  }, []);

  if (!fontsLoaded) return null;

  return (
    <>
      <Toaster position="top-center" />
      <View style={styles.container} onLayout={onLayoutRootView}>
        <View style={styles.content}>
          <Header fetchUser={fetchUser} />

          {userRepositories && <RepositoryList data={userRepositories} />}

          <StatusBar style="auto" />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    padding: 18,
  },
  content: {
    maxWidth: 650,
    width: "100%",
  },
});
