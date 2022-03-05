import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteTwoTone } from "@ant-design/icons";
import {
  deleteDocumentAct,
  getDocumentsAct,
} from "../../redux/Actions/DocumentAction";
import { Button, Space, Table, Tag } from "antd";
import { URL_STATIC } from "../../util/Constants/SystemSettings";
export default function SignDocument() {
  const documentList = useSelector(
    (state) => state.DocumentReducer.documentList
  );

  const dispatch = useDispatch();

  useEffect(() => {
    getDocumentList();

    return () => {};
  }, []);

  const getDocumentList = () => {
    dispatch(getDocumentsAct());
  };

  const formatDate = (strDate) => {
    let newDate = new Date(strDate).toLocaleDateString("vi-GB");
    return newDate;
  };
  const handleDelete = (id) => {
    dispatch(deleteDocumentAct(id));
  };
  const renderDocumentList = () => {
    const columns = [
      {
        title: "#",
        dataIndex: "#",
        key: "#",
      },
      {
        title: "Ngày",
        dataIndex: "Ngày",
        key: "Ngày",
      },
      {
        title: "Biển Số",
        dataIndex: "Biển Số",
        key: "Biển Số",
        render: (plate) => (
          <Tag color="geekblue" key={plate}>
            {plate}
          </Tag>
        ),
      },
      {
        title: "Tuyến",
        dataIndex: "Line",
        key: "Line",
        render: (line) => (
          <Tag color="red" key={line}>
            {line}
          </Tag>
        ),
      },
      {
        title: "File",
        dataIndex: "File",
        key: "File",
        render: (text) => (
          <a
            href={`${URL_STATIC}/${text}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            link
          </a>
        ),
      },
      {
        title: "Action",

        key: "id",
        render: (text, record, index) => {
          return (
            <Space size="middle">
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleDelete(record.id);
                }}
              >
                <DeleteTwoTone twoToneColor="#eb2f96" />
              </span>
              {/* <span>
                <CheckCircleOutlined size="large" />
              </span> */}
            </Space>
          );
        },
      },
    ];

    const dataSource = documentList.map((document, index) => {
      return {
        "#": index + 1,
        Ngày: formatDate(document.dateSign),
        "Biển Số": document.transporter?.plate,
        Line: document.line?.lineNumber,

        File: document.documentImg,
        id: document._id,
      };
    });

    return <Table rowKey="id" dataSource={dataSource} columns={columns} />;
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
                <Button type="primary" size="small">
                  <Link to="/documents/add">Add</Link>
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
                  <div className="card-body">{renderDocumentList()}</div>
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
