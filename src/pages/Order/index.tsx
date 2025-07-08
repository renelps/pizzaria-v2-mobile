import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Modal, FlatList } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { api } from "../../services/api";
import { ModalCategories } from "../../components/ModalOptions";
import { ListItem } from "../../components/ListItem";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsProps } from "../../routes/app.routes"
type RouteDetailParams = {
  Order: {
    tableNumber: string | number;
    order_id: string;
  }
}

export type OrderRouteProps = RouteProp<RouteDetailParams, "Order">;

export interface CategoryProps {
  id: string;
  name: string;
}

interface ProductProps {
  id: string;
  name: string;
}

interface ItemProps {
  id: string;
  product_id: string;
  amount: number,
  name: string;
}

export default function Order(){
  const [amount, setAmount] = useState(1)
  const [category, setCategory] = useState<CategoryProps[] | []>([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>()

  const [products, setProducts] = useState<ProductProps[] | []>([])
  const [productSelected, setProductSelected] = useState<ProductProps | undefined>()
  const [showProductModal, setShowProductModal] = useState(false);

  const [items, setItems] = useState<ItemProps[]>([]);

  const navigate = useNavigation<NativeStackNavigationProp<StackParamsProps>>();
  const route = useRoute<OrderRouteProps>();


  useEffect(() => {
    async function getCategories(){
      const response = await api.get("/category")

      console.log(response.data)
      setCategory(response.data)
      setCategorySelected(response.data[0])
    }

    getCategories();
  }, [])

  useEffect(() => {
    async function getProducts(){
      try {
        const response = await api.get("/category/product", {
          params: {
            category_id: categorySelected?.id
          }
        })

        console.log("Produtos:", response.data);

        setProducts(response.data);
        setProductSelected(response.data[0])
      }catch(err){
        console.log(err)
      }
    }

    getProducts();

  }, [categorySelected])

  function handleChangeCategory(item: CategoryProps){
    setCategorySelected(item)
  }

  function handleChangeProduct(item: ProductProps){
    setProductSelected(item)
  }

  async function handleDeleteOrder(){
    try {
      await api.delete("/order", {
        params: {
          order_id: route.params?.order_id
        }
      })

      navigate.goBack();
    }catch(err){
      console.log(err)
    }
  }

  async function handleAddItem(){
    try {
      const response = await api.post("/order/add", {
        order_id: route.params.order_id,
        product_id: productSelected?.id,
        amount: amount
      })

      let data = {
        id: response.data.id,
        product_id: productSelected?.id as string,
        name: productSelected?.name as string,
        amount: amount
      }

      setItems(prev => [...prev, data])

    }catch(err){
      console.log(err)
    }
  }

  async function handleDeleteItem(item_id: string){
    await api.delete("/order/remove", {
      params: {
        item_id: item_id
      }
    })

    const filterItem = items.filter((item) => item.id !== item_id);

    setItems(filterItem)
  } 

  async function handleFinishOrder(){

    navigate.navigate("FinishOrder", { tableNumber: route.params?.tableNumber, order_id: route.params?.order_id})
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mesa {route.params.tableNumber}</Text>
        <TouchableOpacity onPress={handleDeleteOrder}>
          {items.length === 0 && <Feather name="trash-2" size={24} color="#fe0702"/>}
        </TouchableOpacity>
      </View>
      <View style={styles.containerInput}>
        {category.length !== 0 ? (
          <TouchableOpacity style={[styles.input, { position: "relative", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]} onPress={() => setShowCategoryModal(true)}>
            <Text style={{ color: "#fff" }}>{categorySelected?.name}</Text>
            <Text>
              <Feather name="chevron-down" size={20} color="#fff" />
            </Text>
          </TouchableOpacity>
        ): (
          <TouchableOpacity style={styles.input}>
            <Text style={{ color: "#fff" }}>Sem categorias...</Text>
          </TouchableOpacity>
        )
      
      }
        {products.length > 0 ? (
          <TouchableOpacity style={[styles.input, { position: "relative", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]} onPress={() => setShowProductModal(true)}>
            <Text style={{ color: "#fff" }}>{productSelected?.name}</Text>
            <Text>
              <Feather name="chevron-down" size={20} color="#fff" />
            </Text>
          </TouchableOpacity>
        ): (
          <TouchableOpacity style={styles.input}>
            <Text style={{ color: "#fff" }}>Sem produtos...</Text>
          </TouchableOpacity>
        )
      
      }
      </View>
      <View style={styles.containerQuantity}>
        <TouchableOpacity style={styles.buttonQuantityMinus} onPress={() =>  amount > 1 ? setAmount(value => value - 1) : setAmount(1)}>
          <Feather name="minus" size={20} color="#1d1d2e" />
        </TouchableOpacity>
        <View style={styles.containerTextQuantity}>
          <Text style={styles.textQuantity}>{amount}</Text>
        </View>
        <TouchableOpacity style={styles.buttonQuantityPlus} onPress={() => setAmount(value => value + 1)}>
          <Feather name="plus" size={20} color="#1d1d2e" />
        </TouchableOpacity>
      </View>
      <View style={styles.containerAddItemAndContinue}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: "#fe0702"}]} onPress={handleAddItem}>
            <Text style={styles.actionButtonText}>Adicionar item</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.actionButton, { opacity: items.length === 0 ? 0.5 : 1 }]} disabled={items.length === 0} onPress={handleFinishOrder}>
            <Text style={styles.actionButtonText}>Avançar</Text>
          </TouchableOpacity>
        </View>
      </View>


      <FlatList 
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginTop: 20 }}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ListItem data={item} deleteItem={handleDeleteItem}/>}
      />


      <Modal
        transparent={true} 
        visible={showCategoryModal}
        animationType="fade"
      >
        <ModalCategories
          handleCloseModal={() => setShowCategoryModal(false)}
          options={category}
          selectedItem={ handleChangeCategory }
          offsetTop={125}
        />
      </Modal>

        <Modal
          transparent={true}
          visible={showProductModal}
          animationType="fade"
          >
          <ModalCategories
            handleCloseModal={() => setShowProductModal(false)}
            options={products}
            selectedItem={ handleChangeProduct }
            offsetTop={187}
          />
        </Modal>
    </View> 
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d1d2e",
    paddingVertical: "5%",
    paddingEnd: "5%",
    paddingStart: "5%"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "space-between"
  },
  title: {
    color: "#fff",
    fontSize: 24,
    marginRight: 7,
    fontWeight: "bold"
  },
  containerOrder: {
    width: "95%",
  },
  containerInput: {
    width: "100%",
    gap: 7,
    marginTop: 20
  },
  input: {
    width: "100%",
    backgroundColor: "#101026",
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#000033",
    borderRadius: 4
  },
  containerQuantity: {
    width: "100%",
    flexDirection: "row",
    marginTop: 7,
    height: 50,
    justifyContent: "space-between"
  },
  containerTextQuantity: {
    width: "50%",
    color: "#fff",
    backgroundColor: "#101026",
    alignItems: "center",
    justifyContent: "center"
  },
  textQuantity: {
    color: "#fff",
    fontSize: 20
  },
  buttonQuantityMinus: {
    width: "23%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fe0702",
    borderRadius: 2
  },
  buttonQuantityPlus: {
    width: "23%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1dd",
    borderRadius: 2
  },
  containerAddItemAndContinue: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  },
  buttonContainer: {
    width: "49%",
    marginTop: 10,
  },
  actionButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#1ddd",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2
  },
  actionButtonText: { 
    color: "#101026",
    fontWeight: "600"
  }
})