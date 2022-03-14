import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  TeamOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";
import { Link, Outlet } from "react-router-dom";

const { Header, Footer, Sider, Content } = Layout;

const Main = () => {
  const [state, setState] = useState({
    collapsed: false,
  });
  const toggle = () => {
    
    setState({ ...state, collapsed: !state.collapsed });
  };
  return (
    <>
      <Layout className="mainLayout">
        <Sider
          width="230"
          className="mainSider"
          trigger={null}
          collapsed={state.collapsed}
          breakpoint="md"
          collapsedWidth={0}
          onBreakpoint={(broken) => {
            setState({ collapsed: broken });
          }}
          style={{ width: "250px", maxWidth: "250px" }}
          onCollapse={(collapsed, type) => {
            console.log("onCollapse", collapsed, type);
            // setState({collapsed: true});
          }}
        >
          <div className="brand__link">
            <img src="./logo192.png" alt="logo" />
            <span className="brand-text">Hoàng Giang</span>
          </div>
          <div className="user-panel">
            <div>
              <div className="image">
                <img src="./logo512.png" alt="logo" />
              </div>
              <div className="info">Alexander Pierce</div>
            </div>
          </div>

          <Menu mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/Dashboard">
                <i className="nav-icon fas fa-tachometer-alt"></i> Dashboard
              </Link>
            </Menu.Item>

            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              <Link to="/Transporter">nav 2</Link>
            </Menu.Item>

            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="4" icon={<UploadOutlined />}>
                Tom
              </Menu.Item>
              <Menu.Item key="5">Bill</Menu.Item>
              <Menu.Item key="6">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="7">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header>
            <MenuOutlined
              style={{ cursor: "pointer", padding: "8px 0" }}
              onClick={toggle}
            />
          </Header>
       

          <Content>
            <Outlet />
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default Main;
