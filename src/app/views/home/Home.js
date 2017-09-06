// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import AnimatedView   from '../../components/animatedView/AnimatedView';
import {
  Button,
  Icon,
  Input
}                     from 'antd';
import RepoCard       from '../../components/repoCard/ReposCard';
import webStarters    from '../../config/models/web-starters.json';

const { Search  } = Input;

class Home extends PureComponent {
  static propTypes= {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,

    // views:
    currentView:  PropTypes.string.isRequired,
    enterHome:    PropTypes.func.isRequired,
    leaveHome:    PropTypes.func.isRequired
  };

  componentDidMount() {
    const { enterHome } = this.props;
    enterHome();
  }

  componentWillUnmount() {
    const { leaveHome } = this.props;
    leaveHome();
  }

  render() {
    return(
      <AnimatedView>
        <div id="home">
          <h1 className="title">
            Advanced repository browser
          </h1>
          <div className="search-container">
            <Search
              placeholder="search a repository..."
              className="search-input"
              onSearch={this.handlesOnSearch}
            />
          </div>
          <div className="repos-cards-container">
            {
              webStarters.map(
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

  handlesOnSearch = (value: string) => {

  }
}

export default Home;
