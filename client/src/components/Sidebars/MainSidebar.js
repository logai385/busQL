import React, { Component, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Menu, Button } from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;
const MainSidebar = () => {
  const {
    authState: { user },
  } = useContext(AuthContext);
  const [state,setState] = useState({
    collapsed: false,
  })
  const toggleCollapsed = () => {
    setState({
      collapsed: !this.state.collapsed,
    });
  };
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <a href="/" className="brand-link">
        <img
          src="./img/logo.png"
          alt="logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">Quản Lý Tuyến</span>
      </a>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src={`https://ui-avatars.com/api/?name=${user.username}`}
              className="img-circle elevation-2"
              alt="UserImage"
            />
          </div>
          <div className="info">
            <Link to="/" className="d-block">
              {user?.username}
            </Link>
          </div>
        </div>

        {/* Sidebar Menu */}
        <nav className="mt-2">
          <div style={{ width: 256 }}>
            {/* <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
          {React.createElement(state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          className="nav nav-pills nav-sidebar flex-column"
          theme="outlin"
          inlineCollapsed={state.collapsed}
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
            Option 3
          </Menu.Item>
          <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu> */}
          </div>
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <NavLink to="#" className="nav-link">
                <i className="nav-icon fas fa-chart-pie" />
                <p>
                  Charts
                  <i className="right fas fa-angle-left" />
                </p>
              </NavLink>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="pages/charts/chartjs.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>ChartJS</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/charts/flot.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Flot</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/charts/inline.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Inline</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/charts/uplot.html" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>uPlot</p>
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item  menu-open">
              <NavLink
                activeClassName="active"
                className="nav-link"
                to="/dashboard"
              >
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>Dashboard</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/lines"
                className="nav-link"
                activeClassName="active"
              >
                <i className="nav-icon fa fa-route"></i>
                <p>Tuyến Xe</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/buses"
                className="nav-link"
                activeClassName="active"
              >
                <i className="nav-icon fa fa-bus-alt"></i>
                <p>Quản lý xe</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/documents"
                className="nav-link"
                activeClassName="active"
              >
                <i className="nav-icon fa fa-file-alt"></i>

                <p>Đăng ký tài liệu</p>
              </NavLink>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
};
export default MainSidebar;
