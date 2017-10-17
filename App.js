import React from 'react';
import { StyleSheet, Text, View, Button, Image, FlatList} from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { Card, ListItem, Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    return (
      <Card title='HELLO WORLD'>
      {/*image={require('../images/pic2.jpg')}>*/}
        <Text style={{marginBottom: 10}}>
          The idea with React Native Elements is more about component structure than actual design.
        </Text>
        {/*}<Button
          icon={{name: 'code'}}
          backgroundColor='#03A9F4'
          fontFamily='Lato'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='VIEW NOW' />*/}
      {/*}<SomeOtherWidget
        {...this.props}
        onPress={this._onPress}
      />*/}
      </Card>
    )
  }
}

class MyList extends React.PureComponent {
  state = {selected: (new Map(): Map<string, boolean>)};

  _keyExtractor = (item, index) => item.id;

  _onPressItem = (id: string) => {
    // updater functions are preferred for transactional updates
    this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return {selected};
    });
  };

  _renderItem = ({item}) => (
    <MyListItem
      id={item.id}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
      title={item.title}
    />
  );

  render() {
    return (
      <FlatList
        data={this.props.data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}

class ESHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navigation: this.props.navigation,
    };
  }

  render() {
    return (
      <View style={styles.headerContainer}>
        <Icon.Button
          name="navicon"
          color="black"
          backgroundColor="transparent"
          onPress={() => this.state.navigation.navigate('DrawerToggle')}/>
        <Text>Everyday Stocks</Text>
        <Icon.Button
          name="home"
          color="black"
          backgroundColor="transparent"
          onPress={() => this.state.navigation.navigate('Home')}/>
      </View>
    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Icon name="home"/>
    ),
  };

  render() {
    return (
      <View>
        <ESHeader navigation={this.props.navigation}/>
        <MyList />
      </View>
    );
  }
}

class StocksScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Stocks',
    drawerIcon: ({ tintColor }) => (
      <Icon name="bar-chart"/>
    ),
  };

  render() {
    return (
      <View>
        <ESHeader navigation={this.props.navigation}/>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Settings',
    drawerIcon: ({ tintColor }) => (
      <Icon name="gears"/>
    ),
  };

  render() {
    return (
      <View>
        <ESHeader navigation={this.props.navigation}/>
        <Button
          onPress={() => this.props.navigation.navigate('DrawerToggle')}
          title="Go back home"
        />
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    marginBottom: 10,
    marginTop: 30,
  },
  otherContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
})

const MyApp = DrawerNavigator({
  Home: { screen: HomeScreen },
  Stocks: { screen: StocksScreen },
  Settings: { screen: SettingsScreen },
});

export default class App extends React.Component {
  render() {
    return <MyApp/>;
  }
}
