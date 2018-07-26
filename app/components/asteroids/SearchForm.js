import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import Moment from 'moment';
import DatePicker from '../utilities/DatePicker';

import actions from '../../actions/asteroids';
const Style = {
  component: {
    backgroundColor: '#fafafa',
    paddingTop: 4,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  datePickerItem: {
    padding: 0,
    width: 90,
    height: 32,
  },
  separateText: {
    color: '#7c7c7c',
    width: 40,
    textAlign: 'center',
    marginTop: 8,
  },
};

class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: Moment().format('YYYY-MM-DD'),
      endDate: Moment().format('YYYY-MM-DD'),
    };

    this._handleSearchStart = this._handleSearchStart.bind(this);
    this._changeStartDate = this._changeStartDate.bind(this);
    this._changeEndDate = this._changeEndDate.bind(this);
  }

  _handleSearchStart() {
    this.props.dispatch(
      actions.get({
        start_date: this.state.startDate,
        end_date: this.state.endDate,
      })
    );
  }

  async _changeStartDate(startDate) {
    await this.setState({ startDate });
    this._handleSearchStart();
  }

  async _changeEndDate(endDate) {
    await this.setState({ endDate });
    this._handleSearchStart();
  }

  render() {
    return (
      <View style={Style.component}>
        <DatePicker
          style={Style.datePickerItem}
          date={this.state.startDate}
          androidMode={'spinner'}
          showIcon={false}
          mode="date"
          maxDate={this.state.endDate}
          customStyles={{
            dateInput: {
              borderWidth: 0,
              padding: 0,
            },
          }}
          onDateChange={startDate => this._changeStartDate(startDate)}
        />
        <Text style={Style.separateText}>to</Text>
        <DatePicker
          style={Style.datePickerItem}
          date={this.state.endDate}
          androidMode={'spinner'}
          showIcon={false}
          mode="date"
          minDate={this.state.startDate}
          customStyles={{
            dateInput: {
              borderWidth: 0,
              padding: 0,
            },
          }}
          onDateChange={endDate => this._changeEndDate(endDate)}
        />
      </View>
    );
  }
}

SearchForm.propTypes = {
  dispatch: PropTypes.func,
};

export default SearchForm;
