import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { OrderRouteProps } from "../Order";
import { api } from "../../services/api";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsProps } from "../../routes/app.routes";

type RouteDetailParams = {
  finishOrder: {
    tableNumber: string | number;
    order_id: string;
  }
}


type FinishRouteProp = RouteProp<RouteDetailParams, "finishOrder">
export default function FinishOrder(){



  const route = useRoute<FinishRouteProp>();
  const navigate = useNavigation<NativeStackNavigationProp<StackParamsProps>>();

  async function handleFinishOrder(){
    try {
      await api.put("/order/send", {
        order_id: route.params?.order_id
      })

      navigate.popToTop()
    }catch(err) {
      console.log(err)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.finishText}>Gostaria de finalizar o pedido da mesa <Text style={{ color: "#fe0702"}}>{route.params.tableNumber}</Text>?</Text>
      <TouchableOpacity style={styles.finishButton} onPress={handleFinishOrder}>
        <Feather name="shopping-cart" size={24} color="#1d1d2e" />
        <Text style={styles.finishButtonText}>Finalizar Pedido</Text>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d1d2e",
    paddingVertical: "5%",
    paddingHorizontal: "4%",
    alignItems: "center",
    justifyContent: "center"
  },
  finishText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold", 
    marginBottom: 20,
    width: "90%",
    textAlign: "center",
  },
  finishButton: {
    width: "88%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1ddd",
    borderRadius: 3,
    marginBottom: 80,
    flexDirection: "row",
    gap: 8
  },
  finishButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1d1d2e"

  }

})