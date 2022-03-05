import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, DatePicker, Input, Select, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  GET_TRANSPORTER_LIST_API,
  SET_TRANSPORTER_LINE_LIST,
} from "../../redux/Constants/TransporterConst";
import {
  ADD_DOCUMENT_API,
  GET_DOCUMENT_LIST_API,
} from "../../redux/Constants/DocumentConst";
import _ from "lodash";

const { Option } = Select;
export default function AddSignDocument() {
  // Initialize state & action
  const [signDocument, setSignDocument] = useState({
    dateSign: "",
    transporter: "",
    line: "",
    documentImg: "",
  });
  const dispatch = useDispatch();
  const { transporterList, lineList } = useSelector(
    (state) => state.TransporterReducer
  );

  const getTransporterList = () => {
    dispatch({
      type: GET_TRANSPORTER_LIST_API,
    });
  };

  useEffect(() => {
    getTransporterList();
    return () => {};
  }, []);

  // Handle change
  const handleDateChange = (date, dateString) => {
    setSignDocument({ ...signDocument, dateSign: dateString });
  };

  const handleTransporterChange = (value) => {
    let transporter = transporterList.filter(
      (transporter) => transporter._id === value
    );
    if (transporter.length > 0) {
      transporter = transporter[0];
    }
    let lineList = [...transporter.mainLines, ...transporter.minorLines];
    lineList = _.uniqBy(lineList, "_id");
    if (lineList.length > 0) {
      dispatch({
        type: SET_TRANSPORTER_LINE_LIST,
        lineList: lineList,
      });
    }
    setSignDocument({
      ...signDocument,
      transporter: value,
      line: lineList[0]?._id,
    });
  };
  const handleLineChange = (value) => {
    setSignDocument({ ...signDocument, line: value });
  };
  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    setSignDocument({ ...signDocument, documentImg: file });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("dateSign", signDocument.dateSign);
    formData.append("transporter", signDocument.transporter);
    formData.append("line", signDocument.line);

    formData.append("documentImg", signDocument.documentImg);

    dispatch({
      type: ADD_DOCUMENT_API,
      data: formData,
    });
  };
  // Render fuction
  const renderLineOption = () => {
    return lineList.map((line, index) => (
      <Option key={index} value={line._id}>
        {line.lineNumber}
      </Option>
    ));
  };
  const renderTransorterOption = () => {
    return transporterList.map((transporter, index) => (
      <Option key={index} value={transporter._id}>
        {transporter.plate}
      </Option>
    ));
  };

  return (
    <>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/documents">Home</Link>
              </li>
              <li className="breadcrumb-item active">Đăng ký xe</li>
            </ol>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          <div className="d-flex justify-content-center">
          <div className="col-12 col-md-6">
            <div className="card card-success">
              <div className="card-header">
                <h3 className="card-title text-white">Đăng ký Xe</h3>
              </div>
              {/* /.card-header */}
              {/* form start */}
              <form onSubmit={onSubmit} encType="multipart/form-data">
                <div className="card-body">
                  <input name="id" type="hidden" />
                  <div className="form-row">
                    <div className="form-group col-12">
                      <label htmlFor="inputEmail4">Ngày</label>
                      <DatePicker
                        name="dateSign"
                        size="large"
                        style={{ width: "100%" }}
                        onChange={handleDateChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputAddress ">Số Xe</label>
                    <Select
                      name="transporter"
                      size="large"
                      style={{ width: "100%" }}
                      onChange={handleTransporterChange}
                    >
                      {renderTransorterOption()}
                    </Select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputAddress ">Tuyến</label>
                    <Select
                      name="line"
                      size="large"
                      style={{ width: "100%" }}
                      value={signDocument.line}
                      onChange={handleLineChange}
                    >
                      {renderLineOption()}
                    </Select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputAddress">File </label>
                    <Input
                      size="large"
                      type="file"
                      name="documentImg"
                      onChange={handleChangeFile}
                    ></Input>
                  </div>
                </div>
                {/* /.card-body */}
                <div className="card-footer text-right">
                  <Space>
                    <Button type="primary" size="large" ghost>
                      <Link to="/documents">
                        <i className="fa fa-angle-double-left"></i>
                      </Link>
                    </Button>

                    <Button htmlType="submit" size="large" type="primary">
                      Save
                    </Button>
                  </Space>
                </div>
              </form>
            </div>
          </div>
          </div>
         
        </section>
      </div>
    </>
  );
}
