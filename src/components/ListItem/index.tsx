import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
interface ItemProps {
  data: {
    id: string;
    product_id: string;
    amount: number,
    name: string;
  },
  deleteItem: (item_id: string) => void;
}

export function ListItem({ data, deleteItem }: ItemProps){

  function handleDeleteItem(){
    deleteItem(data.id)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textItem}>{data.amount} - {data.name}</Text>
      <TouchableOpacity onPress={handleDeleteItem}>
        <Feather name="trash-2" size={24} color="#fe0702"/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    height: 50,
    backgroundColor: "#101026",
    paddingHorizontal: 10,
    borderRadius: 2,
    marginBottom: 10
  },
  textItem: {
    color: "#fff",
    fontSize: 15,
  }

})  