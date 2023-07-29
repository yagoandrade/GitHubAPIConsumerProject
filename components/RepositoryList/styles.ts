import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  item: {
    width: "100%",
    padding: 12,
    marginVertical: 4,
    borderRadius: 4,
    backgroundColor: "#fff",
    alignSelf: "center",
  },
  content: {
    gap: 4,
  },
  title: {
    fontFamily: "InterBold",
    fontSize: 22,
  },
  owner: {
    fontFamily: "InterRegular",
    fontSize: 12,
  },
  date: {
    fontFamily: "InterRegular",
    fontSize: 12,
  },
  description: {
    fontFamily: "InterRegular",
    fontSize: 14,
  },
  inlineView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
