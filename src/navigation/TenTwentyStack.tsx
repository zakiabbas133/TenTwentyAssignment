import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import TenTwentyTabs from './TenTwentyTabs';
import MovieDetails from '../screens/MovieDetails';
import BookTicket from '../screens/BookTicket';
import Pay from '../screens/Pay';
import Search from '../screens/Search';

const Stack = createNativeStackNavigator<RootStackParamList>();

function TenTwentyStack() {
    return (
        <Stack.Navigator id="root" screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="TenTwentyTabs" component={TenTwentyTabs} />
            <Stack.Screen name="MovieDetails" component={MovieDetails} />
            <Stack.Screen name="BookTicket" component={BookTicket} />
            <Stack.Screen name="Pay" component={Pay} />
            <Stack.Screen name="Search" component={Search} />
        </Stack.Navigator>
    );
}

export default TenTwentyStack;