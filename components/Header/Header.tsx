import { Octicons, FontAwesome, AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { View, TextInput, Pressable } from "react-native";
import { styles } from "./styles";

interface Props {
  fetchUser: (username: string) => void;
}

const Header = ({ fetchUser }: Props) => {
  const [username, setUsername] = useState("");

  const handleUsernameChange = (username: string) => {
    // Removes whitespace from the username
    setUsername(username.replace(/\s/g, ""));
  };

  return (
    <View style={styles.header}>
      <View style={styles.logo}>
        <Octicons name="logo-github" size={96} color="white" />
      </View>
      <View style={styles.inputView}>
        <FontAwesome
          name="at"
          size={18}
          color="#25292e"
          style={styles.buttonIcon}
        />

        <TextInput
          placeholder="Pesquise um nome de usuário..."
          onChangeText={(text) => handleUsernameChange(text)}
          underlineColorAndroid="transparent"
          value={username}
          style={styles.textInput}
        />

        <Pressable onPress={() => fetchUser(username)}>
          <View>
            <AntDesign name="search1" size={24} color="black" />{" "}
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Header;
