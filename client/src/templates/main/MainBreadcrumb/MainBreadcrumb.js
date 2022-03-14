import React from "react";
import { Breadcrumb } from "antd";
const MainBreadcrumb = (props) => {
  return (
    <div className="breadcrumb__path">
      <div className="content__title">{props.contentTitle}</div>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default MainBreadcrumb;
