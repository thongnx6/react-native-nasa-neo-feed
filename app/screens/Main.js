import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Parallax from '../components/utilities/Parallax';
import SearchForm from '../components/asteroids/SearchForm';
import ListItem from '../components/asteroids/ListItem';

const imagesBackground = require('../assets/images/background.jpg');
const mapStateToProps = state => ({
  asteroids: state.asteroids,
});

export default connect(mapStateToProps)(class Main extends React.Component {
    static propTypes = {
      dispatch: PropTypes.func,
      asteroids: PropTypes.any,
    };

    constructor(props) {
      super(props);

      this.renderContent = this.renderContent.bind(this);
    }

    renderContent() {
      const {asteroids} = this.props;
      return <ListItem dispatch={this.props.dispatch} data={asteroids}/>;
    }

    render() {
      return (
        <Parallax
          headerMinHeight={70}
          headerMaxHeight={200}
          extraScrollHeight={20}
          navbarColor={'#fafafa'}
          titleComponent={() => <SearchForm dispatch={this.props.dispatch}/>}
          backgroundImage={imagesBackground}
          backgroundImageScale={1.4}
          renderContent={this.renderContent}
        />
      );
    }
});
