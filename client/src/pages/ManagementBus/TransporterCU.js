import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GET_LINE_LIST_API } from "../../redux/Constants/LineConst";

import { Button, Form, Input, Select, Space } from "antd";
import {
  addTransporterAct,
  postTransporterAct,
} from "../../redux/Actions/TransporterAction";
const { Option } = Select;

export default function TransporterCU(props) {
  const { action } = useParams();

  const dispatch = useDispatch();
  const { lineList } = useSelector((state) => state.LineReducer);
  const editingTransporter = useSelector(
    (state) => state.TransporterReducer.editingTransporter
  );
  const [transporter, setTransporter] = useState({
    id: editingTransporter._id,
    plate: editingTransporter.plate,
    mainLines: editingTransporter.mainLines,
    minorLines: editingTransporter.minorLines,
  });

  const getLineList = () => {
    dispatch({
      type: GET_LINE_LIST_API,
    });
  };
  const handleOnSubmit = (values) => {
    if (action === "add") dispatch(addTransporterAct(transporter));
    else dispatch(postTransporterAct(transporter));
  };
  useEffect(() => {
    getLineList();
    return () => {};
  }, []);
  const handleNameChange = (e) => {
    // console.log(e);
    let { value } = e.target;
    value = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    setTransporter({
      ...transporter,
      plate: value,
    });
  };
  const handleMainLineChange = (selectedOption) => {
    setTransporter({ ...transporter, mainLines: selectedOption });
  };
  const handleMinorLineChange = (selectedOption) => {
    setTransporter({ ...transporter, minorLines: selectedOption });
  };

  const renderMainLineList = () => {
    const opLines = lineList.map((line, index) => {
      const { _id, lineNumber } = line;
      return (
        <Option key={index} value={_id}>
          {lineNumber}
        </Option>
      );
    });
    const selectedLines = transporter.mainLines.map((line) => {
      return line._id;
    });
    return (
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        size="large"
        name="mainLines"
        onChange={handleMainLineChange}
        defaultValue={selectedLines}
      >
        {opLines}
      </Select>
    );
  };
  const renderSubLineList = () => {
    const opLines = lineList.map((line, index) => {
      const { _id, lineNumber } = line;
      return (
        <Option key={index} value={_id}>
          {lineNumber}
        </Option>
      );
    });
    const selectedLines = transporter.minorLines.map((line) => {
      return line._id;
    });
    return (
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        size="large"
        name="mainLines"
        defaultValue={selectedLines}
        onChange={handleMinorLineChange}
      >
        {opLines}
      </Select>
    );
  };
  return (
    <>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/buses">Home</Link>
              </li>
              <li className="breadcrumb-item active">{action}</li>
            </ol>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          <div className="d-flex justify-content-center">
            <div className="col-12 col-md-6">
              <div className="card card-success">
                <div className="card-header mb-2">
                  <h3 className="card-title text-white">
                    {action === "add" ? "Tạo Tuyến" : "Sửa Tuyến"}
                  </h3>
                </div>
                {/* /.card-header */}
                {/* form start */}
                <Form
                  onFinish={handleOnSubmit}
                  layout="vertical"
                  initialValues={transporter}
                  // onFinish={onFinish}
                >
                  <div className="card-body">
                    <Form.Item
                      label="Xe"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        type="text"
                        size="large"
                        name="plate"
                        value={transporter.plate}
                        onChange={handleNameChange}
                        required
                      />
                    </Form.Item>
                    <Form.Item label="Tuyến Chính">
                      {renderMainLineList()}
                    </Form.Item>

                    <Form.Item label="Tuyến tăng cường">
                      {renderSubLineList()}
                    </Form.Item>
                  </div>
                  {/* /.card-body */}
                  <div className="card-footer text-right">
                    <Space>
                      <Button type="primary" size="large" ghost>
                        <Link to="/buses">
                          <i className="fa fa-angle-double-left"></i>
                        </Link>
                      </Button>

                      <Button htmlType="submit" size="large" type="primary">
                        Save
                      </Button>
                    </Space>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
