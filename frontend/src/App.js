import React from 'react';

import './App.css';
import 'antd/dist/antd.css';

import { Layout, Menu } from 'antd';
import Icon from '@ant-design/icons';

import menuItens from './pages/menu'
import menuImage from './images/butler.png'

const { Header, Content, Sider } = Layout;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Default content is the first of the list
      activeContent: 0,
    };
  }

  handleMenuItemClicked(key) {
    let state = this.state
    state.activeContent = key;

    this.setState(state);
  }

  render() {
    const activeContent = menuItens[this.state.activeContent].content

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
        >
          <div className='menu-image'>
            <img src={menuImage} alt="Toad Butler" />
          </div>
          <hr />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['0']}>
            {menuItens.map(listItem => (
              <Menu.Item
                key={menuItens.indexOf(listItem)}
                onClick={() => this.handleMenuItemClicked(menuItens.indexOf(listItem))}
              >
                {<Icon component={listItem.icon} />}
                <span className="nav-text">{listItem.text}</span>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>

        <Layout>
          <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
            <h1 className="howard-h1">HOWARD</h1>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>

            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              {React.createElement(activeContent)}
            </div>
          </Content>
        </Layout>
      </Layout >
    );
  }
}
