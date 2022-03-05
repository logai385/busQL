import { Button, Form, Input, InputNumber, Select, Space, Set } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CheckSquareTwoTone, CloseSquareTwoTone } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { addLineAct, postLineAct, setEditLineAct } from "../../redux/Actions/LineAction";
const { Option } = Select;

export default function LineCU(props) {
  //     Initialize state & action
  const { editingLine } = useSelector((state) => state.LineReducer);
  const dispatch = useDispatch();
  const { action } = useParams();
  const [lineForm, setLineForm] = useState({
    ...editingLine
  });
  const onFinish = (values) => {
    const newLine = { ...values, status: lineForm.status, id: editingLine.id };
    if (action === "add") {
      dispatch(addLineAct(newLine));
    }
    if (action === "edit") {
      dispatch(postLineAct(newLine));
    }
  };
  
  const handleChangeStatus = (e) => {
    setLineForm({
      ...lineForm,
      status: !lineForm.status,
    });
  };
  return (
    <>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/lines">Home</Link>
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
                <div className="card-header mb-4">
                  <h3 className="card-title text-white">{action==="add"?"Tạo Tuyến":"Sửa Tuyến"}</h3>
                </div>
                {/* /.card-header */}
                {/* form start */}
                <Form
                  layout="vertical"
                  initialValues={editingLine}
                  onFinish={onFinish}
                >
                  <div className="card-body">
                    <Form.Item
                      label="Số tuyến"
                      name="lineNumber"
                      className="mb-3"
                      rules={[
                        {
                          required: true,
                          message: "Nhập số tuyến!",
                        },
                        {
                          type: "number",
                          min: 1,
                          message: "Số tuyến phải lớn hơn 0!",
                        },
                      ]}
                    >
                      <InputNumber size="large" style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item label="Mô tả" name="description">
                      <Input size="large" type="text" name="description" />
                    </Form.Item>

                    <Button
                      type="link"
                      className="my-2"
                      onClick={handleChangeStatus}
                    >
                      <span
                        style={{
                          lineHeight: "20px",
                          color: "black",
                          fontWeight: "bold",
                        }}
                        className="mr-1"
                      >
                        Tráng thái :
                      </span>
                      {lineForm.status ? (
                        <CheckSquareTwoTone style={{ fontSize: "25px" }} />
                      ) : (
                        <CloseSquareTwoTone
                          twoToneColor="#eb2f96"
                          style={{ fontSize: "25px" }}
                        />
                      )}
                    </Button>
                  </div>
                  {/* /.card-body */}
                  <div className="card-footer text-right">
                    <Space>
                      <Button type="primary" size="large" ghost>
                        <Link to="/lines">
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
