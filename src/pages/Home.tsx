import {
  View,
  Text,
} from "react-native";
import { useEffect, useState } from 'react';
import translations from '../localizations/es.json';

const WIDTH_CELL_DATA = '132px';

const getKeyHourRange = (hourRange: string) => {
  const [fromHour, toHour] = hourRange.split('-');
  return `${fromHour}h  -  ${toHour}h`;
}

const getCurrentHourInfo = (data: any) => {
  if (!data) return;
  let currentHour: any = new Date().getHours();
  let nextHour: any = currentHour + 1;
  currentHour = currentHour < 10 ? `0${currentHour}` : currentHour.toString();
  nextHour = nextHour < 10 ? `0${nextHour}` : nextHour.toString();
  const key = `${currentHour}-${nextHour}`;
  return data[key]
}

const getUnits = (data: any) => {
  if (!data) return "";
  return data["00-01"].units;
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
  rowCell: {
    padding: '6px',
    width: WIDTH_CELL_DATA,
  },
  rowCheap: {
    backgroundColor: '#93faa5',
  },
  rowCheapAVG: {
    backgroundColor: '#fe9f0063',
  },
  rowExpensive: {
    backgroundColor: '#f1a9a0',
  },
  rowHeader: {
    fontWeight: '800',
    padding: '10pt',
    textTransform: 'uppercase',
  },
  rowView: {
    borderBottom: '1px solid rgb(216 216 216)',
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-around',
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
  }, []);

  const currentHourInfo: LighPriceInfo | undefined = getCurrentHourInfo(data);

  return (
    <View style={styles.container}>
      <View style={styles.rowView}>
        <Text style={{ ...styles.rowCell, ...styles.rowHeader, width: 'auto'}}>{translations.currentHour}</Text>
        <Text style={{ ...styles.rowCell, ...styles.rowHeader, width: 'auto'}}>{currentHourInfo && currentHourInfo.price}</Text>
      </View>
      {data && (
        <View style={styles.table}>
            <View style={styles.rowView}>
              <Text style={{ ...styles.rowCell, ...styles.rowHeader}}>{translations.hour}</Text>
              <Text style={{...styles.rowCell, ...styles.rowHeader}}>{`${translations.price} ${getUnits(data)}`}</Text>
            </View>
            {/*// @ts-ignore */}
            {Object.values(data).map((lightPrice: LighPriceInfo) => {
              const { hour, price } = lightPrice;
              // is-under-avg
              const styleRow = lightPrice['is-cheap'] ? styles.rowCheap : (lightPrice['is-under-avg'] ? styles.rowExpensive : styles.rowCheapAVG);
              return (
                <View key={`row-${hour}`} style={{...styleRow, ...styles.rowView}}>
                  <Text style={styles.rowCell}>{getKeyHourRange(hour)}</Text>
                  <Text style={styles.rowCell}>{price}</Text>
                </View>
              );
            })}
        </View>
      )}
    </View>
  );
}
export default Home;
