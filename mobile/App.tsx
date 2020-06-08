import React from 'react';
import { StatusBar } from 'react-native';
import { AppLoading } from 'expo';

import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu';

import Routes from './src/routes'

/**
 * <> </> -> tag chamada de fregment onde nao tem nenhum conteudo, porque nao podemos retornar dois elementos
 * Sem estarem em um "tipo de container" ou melhor so retornar um elemento.
*/
export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  });

  if (!fontsLoaded ){
    return <AppLoading />
  }

  return (
    <>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="transparent" 
        translucent
      />
      <Routes />
    </>
  );
}
