// @flow
import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import AnimatedView   from '../../components/animatedView/AnimatedView';
import {
  Input,
  Row,
  Col
}                     from 'antd';
import RepoCard       from '../../components/repoCard/ReposCard';
import webStarters    from '../../config/models/web-starters.json';
import * as Types     from './types';
import {
  doesMatch
}                       from '../../services/utils/repositoryMatches';
import FlipMove         from 'react-flip-move';

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
          <div className="repos-cards-container">
          <Row>
            <FlipMove
              staggerDurationBy="30"
              duration={400}
              typeName="ul"
              staggerDelayBy={2}
            >
              {
                starters.map(
                  (
                    starter,
                    starterIndex
                  ) => {
                    return (
                      <li
                        key={starterIndex}
                        //  style={{
                        //    marginTop: '10px',
                        //    marginBottom: '10px',
                        //    marginLeft: '10px',
                        //    marginRight: '10px'
                        //  }}
                      >
                      <Col
                        md={{ span: 6, offset: 2 }}
                        xs={{ span: 10, offset: 1 }}
                      >
                      <RepoCard
                        card={starter}
                      />
                      </Col>

                      </li>
                    );
                  }
                )
              }
            </FlipMove>
            </Row>
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

      const filteredStarters = webStarters.filter(starter => doesMatch(starter, searchedValue));
      this.setState({ starters: filteredStarters });
    }
  }
}

export default Home;
