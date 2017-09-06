// @flow
import React, {
  PureComponent
}                   from 'react';
import {
  Card,
  Button,
  Icon
}                   from 'antd';
import * as Types   from './types';


class RepoCard extends PureComponent<Types.Props, Types.State> {
  static defaultProps = {
    bordered: true
  };

  state = {
    isLoading: false
  };

  render() {
    const {
      card: {
        name,
        url,
        imageSrc,
        description,
        content,
        platform
      },
      bordered
    } = this.props;

    return (
      <Card
        className="repos-card"
        bordered={bordered}
        bodyStyle={{ padding: 0 }}
      >
        <div className="repos-card-image">
          <img
            alt={name}
            width="100%"
            src={imageSrc}
          />
        </div>
        <div className="repos-card-body">
          <h3>
            {name}
          </h3>
          <p>
            {description}
          </p>
          <Button
            type="primary"
            onClick={this.handlesOnRepo}
          >
            <Icon type="github" />
            go to repository
          </Button>
        </div>
      </Card>
    );
  }

  handlesOnRepo = (
    event: SyntheticEvent<>
  ): void => {
    if (event) {
      event.preventDefault();
    }

    const {
      card: {
        url
      }
    } = this.props;

    window.open(url, '_blank');
  }
}

export default RepoCard;
