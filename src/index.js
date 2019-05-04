import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './screens/Home';
import Map from './screens/Map';
import About from './screens/About';

const RootStack = createStackNavigator(
  {
    Map,
    Home,
    About
  },
  {
    initialRouteName: 'Map'
  }
);

const App = createAppContainer(RootStack);

export default App;
