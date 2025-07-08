import React, { useContext, useState } from "react";
import { Text, StyleSheet, SafeAreaView, TextInput, View, TouchableOpacity } from "react-native";
import { AuthContext } from "../../contexts/authContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { StackParamsProps } from "../../routes/app.routes";
import { api } from "../../services/api";
export default function Dashboard(){

  const [tableNumber, setTableNumber] = useState("");
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsProps>>();
  const { signOut } = useContext(AuthContext);

  async function openTable(){
    if(tableNumber.trim() === '') return;

    try {
      const response = await api.post("/order", {
        table: Number(tableNumber)
      })

      console.log(response.data)
      navigation.navigate('Order', { tableNumber: tableNumber, order_id: response.data.id })
      setTableNumber('')
    }catch(err){
      console.log(err)
    }

  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Adicione um novo pedido</Text>

      <View style={styles.containerInput}>
        <TextInput 
          placeholder="Digite o número da mesa"
          placeholderTextColor="#fff"
          style={styles.input}
          keyboardType="numeric"
          value={tableNumber}
          onChangeText={setTableNumber}
          maxLength={3}
        />

        <TouchableOpacity style={styles.button} onPress={openTable}>
          <Text style={styles.textButton}>Acessar mesa</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1d1d2e",
  },
  title:{
    color: "#fff",
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold"
  },
  containerInput: {
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    gap: 10
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#404040",
    width: "85%",
    paddingHorizontal: 10,
    borderRadius: 4,
    color: "#fff",
    textAlign: "center"
  },
  button: {
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1fff",
    height: 40,
    borderRadius: 4
  },
  textButton: {

  }
})