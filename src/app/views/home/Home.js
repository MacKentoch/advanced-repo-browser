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
import webStarters    from '../../config/models/web-starters.json';
import * as Types     from './types';
import {
  doesMatch
}                     from '../../services/utils/repositoryMatches';
import {
  TransitionMotion,
  spring,
  presets
}                     from 'react-motion';

const { Search  } = Input;


class Home extends PureComponent<Types.Props, Types.State> {
  static propTypes = {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,

    // views:
    currentView:  PropTypes.string.isRequired,
    enterHome:    PropTypes.func.isRequired,
    leaveHome:    PropTypes.func.isRequired
  };


  state = {
    starters: webStarters
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
    const {
      starters
    } = this.state;

    const styles = starters.map(
      (starter) => (
        {
          data: {...starter},
          key: `${starter.name}-${starter.id}`,
          style: { opacity: 1 }
        }
      )
    );

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
              onChange={this.handlesOnSearch}
            />
          </div>

          <TransitionMotion
            willEnter={this.willEnter}
            willLeave={this.willLeave}
            styles={styles}
          >
          {
            (interpolatedStyles) => (
              <div>
                {
                  interpolatedStyles.map(
                    starter => (
                      <div
                        key={starter.key}
                        style={{
                          ...starter.style,
                          marginTop:     '20px',
                          marginBottom:  '20px',
                          marginLeft:    '20px',
                          marginRight:   '20px'
                        }}
                      >
                        <RepoCard
                          card={starter.data}
                        />
                      </div>
                    )
                  )
                }
              </div>
            )
          }
          </TransitionMotion>
        </div>
      </AnimatedView>
    );
  }

  willEnter = () => ({ opacity: 1 });

  willLeave = () => ({ opacity: spring(0, presets.stiff) });

  handlesOnSearch = (
    event: SyntheticEvent<*>
  ): void => {
    if (event) {
      event.preventDefault();
      const searchedValue = event.target.value.trim();

      const filteredStarters = webStarters.filter(starter => doesMatch(starter, searchedValue));
      this.setState({ starters: filteredStarters });
    }
  }
}

export default Home;
