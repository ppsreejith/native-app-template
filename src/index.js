import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './screens/Home';
import Map from './screens/Map';
import About from './screens/About';
import JourneyChooser from './screens/JourneyChooser';

const RootStack = createStackNavigator(
  {
    Map,
    Home,
    About,
    JourneyChooser,
  },
  {
    initialRouteName: 'JourneyChooser'
  }
);

const App = createAppContainer(RootStack);

export default App;
