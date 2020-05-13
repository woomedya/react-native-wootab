import React, { Component } from "react";
import { StyleSheet, SafeAreaView, Platform, Dimensions, Text } from "react-native";
import { color } from './libs/utilities/color';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get("window");

export default class TabLayout extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            index: 0,
            windowWidth: width,
            routes: this.props.routes,
        };
    }

    renderItem = ({ navigationState, position, }) => ({ route }) => {
        var currentIndex = navigationState.routes.map(x => x.title == route.title).indexOf(true);
        var active = currentIndex == this.state.index;
        return (
            <SafeAreaView style={[styles.item]} >
                {
                    route.icon ? <Icon
                        name={route.icon}
                        size={route.iconSize || 26}
                        style={[this.props.iconStyle || styles.icon, active ? { color: this.props.activeIconColor || color.LIGHT_PRIMARY, } : { color: this.props.inactiveIconColor } || styles.inactive]}
                    /> : null
                }
                <Text style={[styles.label, { fontSize: this.props.fontSize || 14 }, active ? { color: this.props.activeLabelColor || color.LIGHT_PRIMARY, } : { color: this.props.inactiveLabelColor } || styles.inactive]}>{route.title}</Text>
            </SafeAreaView >
        );
    };

    renderTabBar = props => {
        return <TabBar
            {...props}
            indicatorStyle={[styles.indicatorStyle, { color: this.props.indicatorColor || color.LIGHT_PRIMARY, backgroundColor: this.props.indicatorBackgroundColor || color.DARK_PRIMARY, }]}
            style={[styles.tabbar, { backgroundColor: this.props.backgroundColor || color.PRIMARY, width: this.state.windowWidth }]}
            onTabPress={this.props.onTabPress}
            renderLabel={this.renderItem(props)}
            scrollEnabled={this.props.scrollEnabled}
            tabStyle={this.props.scrollEnabled ? [{ width: (width / this.props.routes.length) }, {
                paddingHorizontal: 2
            }] : undefined}
        />
    }

    indexChanged = index => {
        this.setState({ index });
    }

    render() {
        return (
            <TabView
                lazy={true}
                removeClippedSubviews={Platform.OS == 'android' ? true : false}
                tabBarPosition={this.props.tabBarPosition}
                swipeEnabled={false}
                navigationState={this.state}
                renderScene={SceneMap(this.props.scanMap)}
                renderTabBar={this.renderTabBar}
                onIndexChange={this.indexChanged}
                initialLayout={{ width: width }}
                style={[styles.container, { width: this.state.windowWidth }]}
                timingConfig={{ duration: 500, }}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.WHITE
    },
    indicatorStyle: {
        height: '100%',
    },
    tabbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tab: {
        flex: 1,
        alignItems: 'center',
    },
    item: {
        flex: 1,
        alignItems: 'center',
        alignContent: "center",
        justifyContent: 'center',
    },
    activeItem: {
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    inactive: {
        color: color.WHITE,
    },
    icon: {
        height: 26,
        width: 26,
    },
    label: {
        backgroundColor: 'transparent',
        alignContent: "center",
    },
});