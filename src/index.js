import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './screens/Home';
import Game from './screens/game';
import Map from './screens/Map';
import About from './screens/About';

const RootStack = createStackNavigator(
  {
    Map,
    Home,
    About,
    Game
  },
  {
    initialRouteName: 'Game'
  }
);

const App = createAppContainer(RootStack);

export default App;
