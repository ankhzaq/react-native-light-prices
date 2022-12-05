import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { Separator } from "react-native-btr";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { useEffect, useState } from 'react';

type Component = {
  title: string;
  icon: string;
};

const COMPONENTS = [
  { title: "BottomSheet", icon: "border-bottom" },
  { title: "CheckBox", icon: "checkbox-marked" },
  { title: "CollapsibleCard", icon: "border-horizontal" },
  { title: "ColorPicker", icon: "palette" },
  { title: "IconPicker", icon: "select-all" },
  { title: "ModalInput", icon: "relative-scale" },
  { title: "RadioGroup", icon: "checkbox-blank-circle-outline" },
  { title: "Separator", icon: "minus" },
  { title: "Tag", icon: "tag" },
];

const MIN_HOUR = 0;
const MAX_HOUR = 23;

const getKeyHourRange = (hourRange: string) => {
  const [fromHour, toHour] = hourRange.split('-');
  return `${fromHour}h  -  ${toHour}h`;
}


const styles = {
  container: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    padding: 18,
  },
  iconLeft: {
    fontSize: 24,
  },
  rowCheap: {
    backgroundColor: '#93faa5',
  },
  rowExpensive: {
    backgroundColor: '#f1a9a0',
  },
  table: {
    backgroundColor: 'white',
    borderSpacing: '5px',
    textAlign: 'center',
  },
  title: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 2,
  },
  iconRight: {
    color: "#ccc",
    fontSize: 20,
  },
};

function Home({ navigation }: any) {

  const [data, setData] = useState(null);

  // function to get data
  async function getLightPRicesApi() {
    try {
      const response = await fetch("https://api.preciodelaluz.org/v1/prices/all?zone=PCB", {
        method: 'GET',
        mode: 'cors',
        credentials: "include",
        redirect: 'follow'
      })
      const responseParsed = await response.json();
      setData(responseParsed);
    } catch (error) {
      console.error(error);
    }
  }

  // useEffect to make the calls
  useEffect(() => {
    getLightPRicesApi();
  }, [])

  const renderItem = ({ item }: { item: Component }) => (
    <TouchableHighlight onPress={() => navigation.navigate(item.title)}>
      <View style={styles.itemContainer}>
        <Icon style={styles.iconLeft} />
        <Text style={styles.title}>{item.title}</Text>
        <Icon name="chevron-right" style={styles.iconRight} />
      </View>
    </TouchableHighlight>
  );

  const keyExtractor = (item: Component) => item.title;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {data && (
        <View style={styles.table}>
            <View>
              <Text>hour</Text>
              <Text>hour</Text>
            </View>
            {/*// @ts-ignore */}
            {Object.values(data).map((lightPrice: LighPriceInfo) => {
              const { hour, price } = lightPrice;
              const styleRow = lightPrice['is-cheap'] ? styles.rowCheap : (lightPrice['is-under-avg'] ? styles.rowExpensive : {});
              return (
                <View key={`row-${hour}`} style={styleRow}>
                  <Text>{getKeyHourRange(hour)}</Text>
                  <Text>{price}</Text>
                </View>
              );
            })}
        </View>
      )}
      {/*<FlatList
        data={COMPONENTS}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={() => <Separator />}
      />*/}
    </View>
  );
}
export default Home;
