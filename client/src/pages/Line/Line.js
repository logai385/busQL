import React, { useEffect } from "react";
// import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteLineAct, getLineListAct, setEditLineAct } from "../../redux/Actions/LineAction";
import { Button, Space, Table, Tag } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
export default function RegisterLine() {
  // Initialize state & action
  const { lineList } = useSelector((state) => state.LineReducer);
  const dispatch = useDispatch();
  // const history = useHistory();
  useEffect(() => {
    getLineList();

    return () => {};
  }, []);
  // action
  const getLineList = () => {
    dispatch(getLineListAct());
  };
  const editeLine = (line) => {
    dispatch(setEditLineAct(line));
    // history.push("/lines/edit");
  }
  const delLine = (id) => {
    dispatch(deleteLineAct(id));
    
  }
  const pushToAdd=()=>{
    const line={
      id:"",
      lineNumber:1,
      description:"",
      status:true
    }
    dispatch(setEditLineAct(line));
    // history.push("/lines/add");
  }
  //render functions
  const renderLineList = () => {
    const columns = [
      {
        title: "#",
        dataIndex: "index",
        key: "index",
      },
      {
        title: "Số Tuyến",
        dataIndex: "lineNumber",
        key: "lineNumber",
        render: (number) => (
          <Tag color="geekblue" key={number}>
            {number}
          </Tag>
        ),
      },
      {
        title: "Tên Tuyến",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        render: (status) =>
          status ? (
            <Tag color="green">Enable</Tag>
          ) : (
            <Tag color="red">Disable</Tag>
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
                  delLine(record.id);
                }}
              >
                <DeleteTwoTone twoToneColor="#eb2f96" />
              </span>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  editeLine(record);
                }}
                >
              <EditTwoTone />
              </span>
            </Space>
          );
        },
      },
    ];

    const dataSource = lineList.map((line, index) => {
      return {
        index: index + 1,
        lineNumber: line.lineNumber,
        description: line.description,
        status: line.status,
        id: line._id,
      };
    });
    return <Table rowKey="id" dataSource={dataSource} columns={columns} />;
  };
  return (
    <>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
        
            <ol className="breadcrumb">
              <li className="breadcrumb-item active">Home</li>
              <li className="breadcrumb-item">
                <Button type="primary" size="small" onClick={pushToAdd}>
                  Add
                </Button>
              </li>
            </ol>
    
        
        </section>
        {/* Main content */}

        <section className="content">
        
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
                  <div className="card-body">{renderLineList()}</div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
    
        
        </section>
        {/* /.content */}
      </div>
    </>
  );
}
