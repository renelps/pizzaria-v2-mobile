import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Dashboard from "../pages/Dashboard";
import Order from "../pages/Order";
import FinishOrder from "../pages/FinishOrder";
export type StackParamsProps = {
  Dashboard: undefined;
  Order: {
    order_id: string; 
    tableNumber: number | string;
  };
  FinishOrder: {
    order_id: string;
    tableNumber: number | string;
  }
}

const Stack = createNativeStackNavigator<StackParamsProps>();

function AppRoutes(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
      <Stack.Screen name="Order" component={Order} options={{ headerShown: false }} />

      <Stack.Screen 
        name="FinishOrder" 
        component={FinishOrder} 
        options={{
          title: "Finalização",
          headerStyle: {
            backgroundColor: "#1d1d2e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  )
}

export default AppRoutes;