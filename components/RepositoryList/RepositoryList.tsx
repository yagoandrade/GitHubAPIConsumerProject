import React, { useCallback } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  Pressable,
  Linking,
} from "react-native";

import { Repository } from "@/types/Repository";
import { toast } from "sonner";
import { styles } from "./styles";

type ItemProps = {
  title: string;
  url: string;
  date: Date;
  owner: string;
  description?: string;
};

const Item = ({ title, url, date, owner, description }: ItemProps) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (!supported) {
      return toast(
        `Não foi possível abrir a URL: ${url}. Talvez você precise instalar um navegador.`
      );
    }

    await Linking.openURL(url);
  }, [url]);

  return (
    <Pressable onPress={() => handlePress()}>
      <View style={styles.item}>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.inlineView}>
            <Text style={styles.owner}>{owner}</Text>
            <Text style={styles.date}>{date.toLocaleDateString("pt")}</Text>
          </View>
          <Text style={styles.description}>
            {description ?? "Nenhuma descrição informada pelo usuário."}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

interface RepositoryListProps {
  data: Repository[];
}

const RepositoryList = ({ data }: RepositoryListProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Item
            title={item.full_name}
            description={item.description}
            date={new Date(item.created_at)}
            owner={item.owner.login}
            url={item.html_url}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default RepositoryList;
