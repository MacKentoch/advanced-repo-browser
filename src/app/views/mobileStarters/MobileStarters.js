// @flow
import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import AnimatedView   from '../../components/animatedView/AnimatedView';
import {
  Input
}                     from 'antd';
import RepoCard       from '../../components/repoCard/ReposCard';
import mobileStarters from '../../config/models/mobile-starters.json';
import * as Types     from './types';

const { Search  } = Input;


class MobileStarters extends PureComponent<Types.Props, Types.State> {
  static propTypes = {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,

    // views:
    currentView:          PropTypes.string.isRequired,
    enterMobileStarters:  PropTypes.func.isRequired,
    leaveMobileStarters:  PropTypes.func.isRequired
  };


  state = {
    starters: mobileStarters
  };

  componentDidMount() {
    const { enterMobileStarters } = this.props;
    enterMobileStarters();
  }

  componentWillUnmount() {
    const { leaveMobileStarters } = this.props;
    leaveMobileStarters();
  }

  render() {
    const {
      starters
    } = this.state;

    return(
      <AnimatedView>
        <div id="home">
          <h1 className="title">
            Mobile Starters
          </h1>
          <div className="search-container">
            <Search
              placeholder="search a repository..."
              className="search-input"
              onSearch={this.handlesOnSearch}
              onChange={this.handlesOnSearch}
            />
          </div>
          <div className="repos-cards-container">
            {
              starters.map(
                (
                  starter,
                  starterIndex
                ) => {
                  return (
                    <div
                      key={starterIndex}
                      style={{
                        marginTop: '10px',
                        marginBottom: '10px',
                        marginLeft: '10px',
                        marginRight: '10px'
                      }}
                    >
                      <RepoCard
                        card={starter}
                      />
                    </div>
                  );
                }
              )
            }
          </div>
        </div>
      </AnimatedView>
    );
  }

  handlesOnSearch = (
    event: SyntheticEvent<*>
  ): void => {
    if (event) {
      event.preventDefault();
      const searchedValue = event.target.value.trim();

      const filteredStarters = mobileStarters.filter(starter => starter.name.trim().includes(searchedValue));
      this.setState({ starters: filteredStarters });
    }
  }
}

export default MobileStarters;
