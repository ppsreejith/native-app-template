import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './screens/Home';
import About from './screens/About';

const RootStack = createStackNavigator(
  {
    Home,
    About
  },
  {
    initialRouteName: 'Home'
  }
);

const App = createAppContainer(RootStack);

export default App;
