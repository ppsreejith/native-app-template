import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './screens/Home';
import Map from './screens/Map';
import About from './screens/About';
import JourneyChooser from './screens/JourneyChooser';
import JourneyProgress from './screens/JourneyProgress';
import BookingComplete from './screens/BookingComplete';

const RootStack = createStackNavigator(
  {
    Map,
    Home,
    About,
    JourneyChooser,
    JourneyProgress,
    BookingComplete,
  },
  {
    initialRouteName: 'JourneyProgress'
  }
);

const App = createAppContainer(RootStack);

export default App;
