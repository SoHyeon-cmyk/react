import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// https://nomadcoders.co/react-native-for-beginners/lobby?utm_source=free_course&utm_campaign=react-native-for-beginners&utm_medium=site


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
