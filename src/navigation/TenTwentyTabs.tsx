import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import Dashboard from '../screens/Dashboard';
import Watch from '../screens/Watch';
import Media from '../screens/Media';
import More from '../screens/More';
import { TabsSvg } from '../../assets/svgs/Tabs';
import { SvgXml } from 'react-native-svg';
import type { BottomTabParamList } from './types';

const Tab = createBottomTabNavigator<BottomTabParamList>();

function TenTwentyTabs() {
    return (
        <Tab.Navigator id="tab-root" initialRouteName='Watch' screenOptions={{
            headerShown: false,
            tabBarStyle: styles.tabBar,
            tabBarInactiveTintColor: '#827D88',
            tabBarActiveTintColor: '#fff',
        }}>
            <Tab.Screen name="Dashboard" component={Dashboard} options={{
                tabBarIcon: ({ focused }) => <SvgXml xml={focused ? TabsSvg.dashboardActive : TabsSvg.dashboardInactive} />
            }} />
            <Tab.Screen name="Watch" component={Watch} options={{
                tabBarIcon: ({ focused }) => <SvgXml xml={focused ? TabsSvg.watchActive : TabsSvg.watchInactive} />
            }} />
            <Tab.Screen name="Media" component={Media} options={{
                tabBarIcon: ({ focused }) => <SvgXml xml={focused ? TabsSvg.mediaActive : TabsSvg.mediaInactive} />
            }} />
            <Tab.Screen name="More" component={More} options={{
                tabBarIcon: ({ focused }) => <SvgXml xml={focused ? TabsSvg.moreActive : TabsSvg.moreInactive} />
            }} />
        </Tab.Navigator>
    );
}

export default TenTwentyTabs;

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#2E2739',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    }
})