import { 
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView

} from "react-native";
import { CategoryProps } from "../../pages/Order";

interface ModalCategoriesProps {
  options: CategoryProps[];
  handleCloseModal: () => void;
  selectedItem: (item: CategoryProps) => void;
  offsetTop: number;
}

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window")
export function ModalCategories({ handleCloseModal, selectedItem, options, offsetTop}: ModalCategoriesProps){

  function handleSelectOption(item: CategoryProps){
    
    selectedItem(item)
    handleCloseModal();
  }

  const option = options.map((item, index) => (
    <TouchableOpacity key={index} style={styles.option} onPress={() => handleSelectOption(item)}>
      <Text style={styles.itemText}>
        {item?.name}
      </Text>
    </TouchableOpacity>
  ))

  return (
    <TouchableOpacity style={styles.container} onPress={handleCloseModal}>
      <View style={[styles.content, { top: offsetTop}]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {option}
        </ScrollView>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  content: {
    width: WIDTH - 20,
    position: "absolute",
    height: HEIGHT / 2,
    backgroundColor: "#1d1d2e",
    borderRadius: 2,
  },
  option: {
    alignItems: "flex-start",
    borderWidth: 0.5,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: "#101026",
    marginVertical: 4,
    paddingVertical: 15
  },
  itemText: {
    fontWeight: "600",
    color: "#fff"
  }
})