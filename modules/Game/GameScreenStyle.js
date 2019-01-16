import { StyleSheet } from 'react-native';
import colors from '../../constants/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(248,248,248)',
  },
  contantContainer: {
    paddingHorizontal: 15,
  },
  itemContainer: {
    paddingBottom: 15
  },
  item: {
    paddingVertical: 5,
  },
  itemGreen: {
    padding: 15,
    color: 'rgb(0,200,114)',
  },
  itemRed: {
    padding: 15,
    color: 'rgb(254,56,36)',
  },
  headerNav: {
    elevation: 0,
    height: 40,
    backgroundColor: 'rgb(248,248,248)',
  },
  headerContainer: {
    borderTopWidth: 1,
    borderColor: 'rgba(175, 178, 180, 0.21)',
    minHeight: 70,
    backgroundColor: 'white',
    paddingTop: 5,
    padding: 15,
    elevation: 4,
  },
  headerText: {
    width: '80%',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  icon: {
    paddingHorizontal: 15,
  },
  linkText: {
    fontSize: 14,
  },
  loader: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 50,
    height: 50,
  },
  optionContainer: {
    alignItems: 'flex-end',
    position: 'absolute',
    right: 0,
    padding: 15,
  },
  optionItem: {
    elevation: 2,
    marginBottom: 10,
    backgroundColor: colors.tintColor,
    padding: 5,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionItemText: {
    color: 'white',
  },
  serchItem: {
    zIndex: 1,
  },
  inputStyle: {
    position: 'absolute',
    bottom: 10,
    right: 0,
    //width: 300,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    margin: 0,
    fontSize: 20,
    lineHeight: 24,
    padding: 4.5,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.tintColor,
  },
})
