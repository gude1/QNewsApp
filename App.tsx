import React, {useEffect} from 'react';
import Navigation from './src/navigation';
import {PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import {store} from './src/redux/store/store';
import {initUsersTable} from './src/config/sqlite';

function App(): React.JSX.Element {
  useEffect(() => {
    initUsersTable();
    return () => {};
  }, []);

  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <Navigation />
      </PaperProvider>
    </StoreProvider>
  );
}

export default App;
