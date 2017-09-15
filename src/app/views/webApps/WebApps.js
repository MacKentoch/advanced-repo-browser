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
import webApps        from '../../config/models/web-apps.json';
import * as Types     from './types';
import {
  doesMatch
}                     from '../../services/utils/repositoryMatches';

const { Search  } = Input;


class WebApps extends PureComponent<Types.Props, Types.State> {
  static propTypes = {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,

    // views:
    currentView:         PropTypes.string.isRequired,
    enterWebStarters:    PropTypes.func.isRequired,
    leaveWebStarters:    PropTypes.func.isRequired
  };


  state = {
    starters: webApps
  };

  componentDidMount() {
    const { enterWebStarters } = this.props;
    enterWebStarters();
  }

  componentWillUnmount() {
    const { leaveWebStarters } = this.props;
    leaveWebStarters();
  }

  render() {
    const {
      starters
    } = this.state;

    return(
      <AnimatedView>
        <div id="home">
          <h1 className="title">
            Web Applications
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

      const filteredStarters = webApps.filter(starter => doesMatch(starter, searchedValue));
      this.setState({ starters: filteredStarters });
    }
  }
}

export default WebApps;
