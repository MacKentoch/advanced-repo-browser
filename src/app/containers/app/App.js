// @flow

import React, {
  Component
}                             from 'react';
import {
  Layout,
  Menu,
  Icon
}                             from 'antd';
import navigationModel        from '../../config/navigation.json';
import drawerModel            from '../../config/drawer.json';
import MainRoutes             from '../../routes/MainRoutes';
import * as Types             from './types';

const { Header, Content, Footer, Sider } = Layout;
const MenuItem = Menu.Item; // workaround to fix production bundle error: "Menu not found"


class App extends Component<Types.Props, Types.State> {
  state = {
    nav: navigationModel,
    drawer: drawerModel,
    selectedSidemenu: ['/'],
    collapsed: true
  };

  render() {
    const {
      // nav,
      drawer,
      selectedSidemenu,
      collapsed
    } = this.state;

    return (
      <Layout className="layout">
        <Sider
          onCollapse={this.handlesOnCollpase}
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{backgroundColor: '#FFF'}}
        >
          <div className="side-menu-logo" style={{backgroundColor: '#000', borderRight: '1px solid #000'}} />
          <Menu
            mode="inline"
            style={{ height: '100%', borderRight: '0px solid #e9e9e9' }}
            defaultSelectedKeys={selectedSidemenu}
            onClick={this.handlesOnMenuClick}
          >
          {
            drawer.map(
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
        <Header  // className="layout-header"
          style={{ position: 'fixed', width: '100%', zIndex:99, padding: 0, paddingLeft: '10px', backgroundColor: '#000' }}
        >
          <Icon
            className="trigger"
            type={ collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggle}
          />
        </Header>
        <Layout
          style={{ background: '#fff', borderLeft: '1px solid #e9e9e9', paddingTop: '64px' }}
        >
          <Content style={{ margin: '74px 16px 0',  background: '#fff', }}>
            <div style={{ padding: 24, minHeight: 360 }}>
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
    this.setState({collapsed});
    /* eslint-enable no-console */
  }

  handlesOnMenuClick = (
    event: SyntheticEvent<*>
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
