import { Button, Space, Table, Tag } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  DELETE_TRANSPORTER_API,
  GET_TRANSPORTER_LIST_API,
  SET_EDITING_TRANSPORTER,
} from "../../redux/Constants/TransporterConst";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import {
  deleteTransporterAct,
  getTransporterListAct,
} from "../../redux/Actions/TransporterAction";

export default function Transporters() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { transporterList } = useSelector((state) => state.TransporterReducer);
  useEffect(() => {
    getTransporterList();
    return () => {};
  }, []);

  const getTransporterList = () => {
    dispatch(getTransporterListAct());
  };

  const deleteTransporter = (id) => {
    dispatch(deleteTransporterAct(id));
  };

  const handleEditTransporter = (transporter) => {
    dispatch({
      type: SET_EDITING_TRANSPORTER,
      transporter: transporter,
    });
    history.push("/buses/edit");
  };
  const handleClickADD = () => {
    dispatch({
      type: SET_EDITING_TRANSPORTER,
      transporter: {
        id: "",
        plate: "",
        mainLines: [],
        minorLines: [],
      },
    });
    history.push("/buses/add");
  };
  const renderTransporterList = () => {
    const columns = [
      {
        title: "#",
        dataIndex: "index",
        key: "index",
      },

      {
        title: "Biển Số",
        dataIndex: "plate",
        key: "plate",
        render: (plate) => (
          <Tag color="geekblue" key={plate}>
            {plate}
          </Tag>
        ),
      },
      {
        title: "Tuyến chính",
        dataIndex: "mainLines",
        key: "mainLines",
        render: (lines) =>
          lines.map((line, index) => {
            return (
              <Tag color="green" key={index}>
                {line.lineNumber}
              </Tag>
            );
          }),
      },
      {
        title: "Tuyến tăng cường",
        dataIndex: "minorLines",
        key: "minorLines",
        render: (lines) =>
          lines.map((line, index) => {
            return (
              <Tag color="red" key={index}>
                {line.lineNumber}
              </Tag>
            );
          }),
      },

      {
        title: "Action",

        key: "_id",
        render: (text, record, index) => {
          return (
            <Space size="middle">
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  deleteTransporter(record._id);
                }}
              >
                <DeleteTwoTone twoToneColor="#eb2f96" />
              </span>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleEditTransporter(record);
                }}
              >
                <EditTwoTone />
              </span>
            </Space>
          );
        },
      },
    ];

    const dataSource = transporterList.map((transporter, index) => {
      let { _id, plate, mainLines, minorLines } = transporter;

      return {
        index: index + 1,
        plate: plate,
        mainLines: mainLines,
        minorLines: minorLines,
        _id: _id,
      };
    });

    return <Table rowKey="_id" dataSource={dataSource} columns={columns} />;
  };

  return (
    <>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <ol className="breadcrumb">
              <li className="breadcrumb-item active">Home</li>
              <li className="breadcrumb-item">
                <Button type="primary" size="small" onClick={handleClickADD}>
                  Add
                </Button>
              </li>
            </ol>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}

        <section className="content">
          <div className="container-fluid">
            <h1>Danh Sách</h1>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  {/* <div className="card-header">
                    <h3 className="card-title">
                      DataTable with default features
                    </h3>
                  </div> */}
                  {/* /.card-header */}
                  <div className="card-body">{renderTransporterList()}</div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
    </>
  );
}
