// @flow weak

import React, {
  Component
}                             from 'react';
import PropTypes              from 'prop-types';
import {
  Layout,
  Menu,
  Icon
}                             from 'antd';
import navigationModel        from '../../config/navigation.json';
import drawerModel            from '../../config/drawer.json';
import MainRoutes             from '../../routes/MainRoutes';

const { Header, Content, Footer, Sider } = Layout;
const MenuItem = Menu.Item; // workaround to fix production bundle error: "Menu not found"

class App extends Component {
  static propTypes = {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,

    // views:
    currentView: PropTypes.string

  };

  state = {
    navModel: navigationModel,
    drawerModel: drawerModel,
    selectedSidemenu: ['/'],
    collapsed: false
  };

  render() {
    const {
      navModel,
      drawerModel,
      selectedSidemenu,
      collapsed
    } = this.state;

    return (
      <Layout className="layout">
        <Sider
          // breakpoint="lg"
          // collapsedWidth="0"
          onCollapse={this.handlesOnCollpase}
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="side-menu-logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={selectedSidemenu}
            onClick={this.handlesOnMenuClick}
          >
          {
            drawerModel.map(
              (
                {
                  label,
                  icon,
                  link
                }
              ) => (
                <MenuItem
                  key={link}>
                  <Icon type={icon} />
                  <span className="nav-text">
                    { label }
                  </span>
                </MenuItem>
              )
            )
          }
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#4A4A4A', padding: 0 }}>
            <Icon
              className="trigger"
              type={ collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <MainRoutes />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Github "advanced repository browser" made with <span style={{ color: '#CF000F' }}>❤️</span> by Erwan Datin
          </Footer>
        </Layout>
      </Layout>
    );
  }

  handlesOnCollpase = (
    collapsed: boolean,
    type: string
  ): void => {
    /* eslint-disable no-console */
    console.log(collapsed, type);
    /* eslint-enable no-console */
  }

  handlesOnMenuClick = (
    event: SyntheticEvent<>
  ): void => {
    if (event) {
      const { history } = this.props;
      const { key } = event;

      history.push(key);
    }
  }

  toggle = () => {
    const {
      collapsed
    } = this.state;

    this.setState({
      collapsed: !collapsed,
    });
  }
}

export default App;
