import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const appearance = {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    };

    if (!this.props.loading) return null;

    return (
      <ActivityIndicator animating={this.props.loading} style={appearance} />
    );
  }
}

Loader.propTypes = {
  loading: PropTypes.any,
};

export default Loader;
