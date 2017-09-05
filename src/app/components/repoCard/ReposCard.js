// @flow
import React, {
  PureComponent
}                   from 'react';
import {
  Card
}                   from 'antd';
import * as Types   from './types';


class RepoCard extends PureComponent<Types.Props, Types.State> {
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
      }
    } = this.props;

    return (
      <Card
        style={{ width: 240 }}
        bodyStyle={{ padding: 0 }}
      >
        <div className="custom-image">
          <img
            alt={name}
            width="100%"
            src={imageSrc}
          />
        </div>
        <div className="custom-card">
          <h3>
            {name}
          </h3>
          <p>
            {description}
          </p>
        </div>
      </Card>
    );
  }
}

export default RepoCard;
