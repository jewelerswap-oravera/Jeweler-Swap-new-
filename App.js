import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button, StyleSheet } from 'react-native';

// Экран 1: Главная
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 JEWELERSWAP</Text>
      <Text style={styles.subtitle}>Экосистема для ювелирной индустрии</Text>
      
      <View style={styles.buttonContainer}>
        <Button title="📄 Мои NFT-паспорта" onPress={() => navigation.navigate('Passports')} />
        <Button title="🔍 Проверить NFC" onPress={() => navigation.navigate('ScanNFC')} />
        <Button title="🆕 Создать паспорт" onPress={() => navigation.navigate('CreatePassport')} />
        <Button title="👑 Панель ювелира" onPress={() => navigation.navigate('JewelerPanel')} />
        <Button title="🔄 Прокат/Обмен" onPress={() => navigation.navigate('RentExchange')} />
        <Button title="🏪 Магазин" onPress={() => navigation.navigate('Marketplace')} />
      </View>
    </View>
  );
}

// Экран 2: Мои паспорта
function PassportsScreen() {
  return (
    <View style={styles.container}>
      <Text>📄 Мои NFT-паспорта</Text>
      <Text>Здесь будут ваши верифицированные изделия</Text>
    </View>
  );
}

// Экран 3: Сканировать NFC
function ScanNFCScreen() {
  return (
    <View style={styles.container}>
      <Text>🔍 Сканировать NFC метку</Text>
      <Text>Наведите камеру на NFC метку изделия</Text>
    </View>
  );
}

// Экран 4: Создать паспорт
function CreatePassportScreen() {
  return (
    <View style={styles.container}>
      <Text>🆕 Создать NFT-паспорт</Text>
      <Text>1. Приклейте NFC метку</Text>
      <Text>2. Сфотографируйте изделие</Text>
      <Text>3. Заполните данные</Text>
      <Text>4. Отправьте на верификацию ювелиру</Text>
    </View>
  );
}

// Экран 5: Панель ювелира
function JewelerPanelScreen() {
  return (
    <View style={styles.container}>
      <Text>👑 Панель ювелира-модератора</Text>
      <Text>Здесь ювелиры проверяют новые паспорта</Text>
    </View>
  );
}

// Экран 6: Прокат/Обмен
function RentExchangeScreen() {
  return (
    <View style={styles.container}>
      <Text>🔄 Прокат и обмен</Text>
      <Text>Арендуйте или обменивайте верифицированные изделия</Text>
    </View>
  );
}

// Экран 7: Магазин
function MarketplaceScreen() {
  return (
    <View style={styles.container}>
      <Text>🏪 Магазин</Text>
      <Text>Покупайте и продавайте с гарантией подлинности</Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'JewelerSwap' }} />
        <Stack.Screen name="Passports" component={PassportsScreen} />
        <Stack.Screen name="ScanNFC" component={ScanNFCScreen} />
        <Stack.Screen name="CreatePassport" component={CreatePassportScreen} />
        <Stack.Screen name="JewelerPanel" component={JewelerPanelScreen} />
        <Stack.Screen name="RentExchange" component={RentExchangeScreen} />
        <Stack.Screen name="Marketplace" component={MarketplaceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 30 },
  buttonContainer: { width: '100%', gap: 10 }
});
