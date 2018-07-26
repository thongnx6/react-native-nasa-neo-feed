import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, View, Text, Animated, Easing } from 'react-native';

const logoIcon = require('../../assets/images/galaxy.png');

const Style = {
  container: {
    justifyContent: 'center',
    paddingLeft: 12,
    marginLeft: 12,
    marginRight: 12,
    height: 50,
    borderBottomColor: '#ececec',
    borderBottomWidth: 1,
  },
};

class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.spinValue = new Animated.Value(0);
    this._handleSearchStart = this._handleSearchStart.bind(this);
  }

  componentDidMount() {
    this.spin();
  }
  spin() {
    this.spinValue.setValue(0);
    Animated.timing(this.spinValue, {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear,
    }).start(() => this.spin());
  }

  _handleSearchStart() {}

  render() {
    console.info(this.props);
    const { near_earth_objects, loading, element_count, error_message } = this.props.data;
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <View>
        {loading === true && (
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <Animated.Image
              style={{
                marginTop: 40,
                alignSelf: 'center',
                transform: [{ rotate: spin }],
              }}
              resizeMode={'center'}
              source={logoIcon}
            />
            <Text style={{ color: '#7c7c7c' }}>Fetching data...</Text>
          </View>
        )}

        {loading === null && (
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <Animated.Image
              style={{
                marginTop: 40,
                alignSelf: 'center',
                transform: [{ rotate: spin }],
              }}
              resizeMode={'center'}
              source={logoIcon}
            />
            <Text style={{ color: '#7c7c7c' }}>Please choose start date and end date above...</Text>
          </View>
        )}

        {loading === false &&
          error_message !== null && (
            <View
              style={{
                alignItems: 'center',
              }}
            >
              <Animated.Image
                style={{
                  marginTop: 40,
                  alignSelf: 'center',
                  transform: [{ rotate: spin }],
                }}
                resizeMode={'center'}
                source={logoIcon}
              />
              <Text
                style={{ color: '#7c7c7c', paddingLeft: 20, paddingRight: 20, textAlign: 'center' }}
              >
                {error_message}
              </Text>
            </View>
          )}

        {loading === false &&
          error_message === null &&
          Object.keys(near_earth_objects).map(key => {
            return (
              <View key={key}>
                <View
                  style={{
                    padding: 12,
                    backgroundColor: '#ececec',
                  }}
                >
                  <Text>{key}</Text>
                </View>
                <FlatList
                  data={near_earth_objects[key]}
                  renderItem={({ item }) => (
                    <TouchableOpacity>
                      <View style={Style.container}>
                        <Text>{item.name}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item.neo_reference_id}
                />
              </View>
            );
          })}
      </View>
    );
  }
}

ListItem.propTypes = {
  dispatch: PropTypes.func,
  data: PropTypes.object,
};

export default ListItem;
