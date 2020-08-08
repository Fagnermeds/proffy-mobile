import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8257E5',
    flex: 1,
    justifyContent: 'center',
    padding: 40,
  },
  banner: {
    width: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontFamily: 'Poppins_400Regular',
    color: '#fff',
    fontSize: 20,
    lineHeight: 30,
    marginTop: 80,
  },
  titleBold: {
    fontFamily: 'Poppins_600SemiBold',
  },
  buttonsContainer: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    height: 150,
    width: '48%',
    backgroundColor: '#333',
    padding: 24,
    paddingBottom: 32,
    justifyContent: 'space-between', 
  },
  buttonPrimary: {
    backgroundColor: '#9871f5',
  },
  buttonSecondary: {
    backgroundColor: '#04d361',
  },
  buttonText: {
    fontFamily: 'Archivo_700Bold',
    color: '#fff',
    fontSize: 20,
  },
  totalConnections: {
    fontFamily: 'Poppins_400Regular',
    color: '#d4c2ff',
    lineHeight: 20,
    maxWidth: 180,
    marginTop: 32,
  }
});

export default styles;