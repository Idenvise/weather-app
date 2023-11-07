import { StyleSheet, View, StatusBar, useWindowDimensions, ActivityIndicator } from 'react-native';
import Header from './components/Header/Header';
import { observer } from 'mobx-react-lite';
import Cards from './components/Cards';
import useStore from './hooks/useStore';
import { StoreContext } from './hooks/useStore';

const App = observer(() => {
  const {height, width} = useWindowDimensions();
  const store = useStore();
  
  if (store.isLoading === true) {
    return ( 
      <View style={styles.loader}>
        <ActivityIndicator size='large' color='#000'/>
        <StatusBar />
      </View>
    )
  }
  
  return (
    <StoreContext.Provider value={store}>
      <>
        <View style={styles.container}>
          <Header/>
          {
            store.days !== undefined && store.name !== undefined ? <Cards name={store.name} width={width}/> : null
          }
          <StatusBar />
        </View>
      </>
      
    </StoreContext.Provider>                            
  );
})

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    maxWidth: 1440,
    justifySelf: 'center',
    marginHorizontal: 20
  },
  loader: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default App

