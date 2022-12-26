import { StyleSheet } from 'react-native';

const WIDTH_CELL_DATA = '132px';

export default StyleSheet.create({
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
  container: {
    flex: 1,
  },
  containerGrid: {
    flex: 2
  },
  logo: {
    flex: 1,
    height: 120,
    width: 90,
    alignSelf: "center",
    margin: 30
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16
  },
  button: {
    backgroundColor: '#788eec',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center'
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: "bold"
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20
  },
  footerText: {
    fontSize: 16,
    color: '#2e2e2d'
  },
  footerLink: {
    color: "#788eec",
    fontWeight: "bold",
    fontSize: 16
  }
});
