import {
  MinusCircleOutlined,
  BookOutlined,
  PlusOutlined,
  SelectOutlined,
  UserOutlined,
  AccountBookOutlined,
  PercentageOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Select, Space, message } from "antd";
import { Option } from "antd/es/mentions";
import { useEffect, useState } from "react";
import "./Academic.css";
import "./Profile.css";
import Api from "../utills/Api";

const Academic = () => {
  const loggedInUser = JSON.parse(
    window.localStorage.getItem("jobeznepalUser")
  );
  let loggedInUserID = loggedInUser.doUserExist._id;

  const [formValues, setFormValues] = useState([]);
  const [userEduDetails, setUserEduDetails] = useState("");
  const [isAdd, setIsAdd] = useState(false);

  const onFinish = async (values) => {
    console.log("Received values of form:", values);
    const userId = loggedInUserID;
    const userEducation = values.users;
    try {
      const sendEducationDetails = await Api.post("/educationDetails", {
        userId,
        userEducation,
      });
      message.success(sendEducationDetails.data.Message);
      getUserEduDetails();
    } catch (error) {
      console.log(error);
      message.error(error.response.data);
    }
  };
  const getUserEduDetails = async () => {
    try {
      const getData = await Api.get(`/getUserEducation/${loggedInUserID}`);
      setUserEduDetails(getData.data.finduser);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserEduDetails();
  }, []);

  return (
    <>
      {userEduDetails ? (
        <>
          <div className="educationDiv">
            {userEduDetails.userEducation.map((key, index) => (
              <div className="educationData" key={index}>
                <fieldset>
                  <legend>Qualification</legend>
                  <h1 className="educationItem">
                    {key.Qualification.toUpperCase()}
                  </h1>
                </fieldset>
                <fieldset>
                  <legend>Course</legend>
                  <h1 className="educationItem"> {key.Course.toUpperCase()}</h1>
                </fieldset>
                <fieldset>
                  <legend>Passed Year</legend>
                  <h1 className="educationItem">{key.PassedYear}</h1>
                </fieldset>
                <fieldset>
                  <legend>Percentage/Grade</legend>
                  <h1 className="educationItem">{key.Grade}</h1>
                </fieldset>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <Form
            name="dynamic_form_nest_item"
            layout="vertical"
            onFinish={onFinish}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
            autoComplete="off"
          >
              <Form.List name="users" >
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexWrap: "wrap",
                          margin: "0px 50px",
                        }}
                        // align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          label="Qualification"
                          name={[name, "Qualification"]}
                          className="dynamicFormItem"
                          rules={[
                            {
                              required: true,
                              message: "Select Your Qualification Level",
                            },
                          ]}
                        >
                          <Select
                            suffixIcon={<SelectOutlined />}
                            placeholder="Select Your Study Level"
                            allowClear
                          >
                            <Select.Option value="slc/see">
                              SLC/SEE
                            </Select.Option>
                            <Select.Option value="+2">+2</Select.Option>
                            <Select.Option value="Bachelor">
                              Bachelor
                            </Select.Option>
                            <Select.Option value="Master">
                              Master{" "}
                            </Select.Option>
                          </Select>
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          label="Course"
                          name={[name, "Course"]}
                          className="dynamicFormItem"
                          rules={[
                            {
                              required: true,
                              message: "Please provide your course details",
                            },
                          ]}
                        >
                          <Input
                            prefix={
                              <BookOutlined className="site-form-item-icon" />
                            }
                            placeholder="Ex- Computer,Account,Science...."
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          label="Percentage/Grade"
                          name={[name, "Grade"]}
                          className="dynamicFormItem"
                          rules={[
                            {
                              required: true,
                              message: "Please provide your marks details",
                            },
                          ]}
                        >
                          <Input
                            prefix={
                              <PercentageOutlined className="site-form-item-icon" />
                            }
                            placeholder="Ex- 80% or A+ "
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          label="Passed Year"
                          name={[name, "PassedYear"]}
                          className="dynamicFormItem"
                          rules={[
                            {
                              required: true,
                              message: "Please provide your qualified year",
                            },
                          ]}
                        >
                          <InputNumber
                            initialvalues={2015}
                            prefix={
                              <FieldTimeOutlined className="site-form-item-icon" />
                            }
                            placeholder="Ex-2015"
                          />
                        </Form.Item>

                        <MinusCircleOutlined
                          onClick={() => remove(name)}
                          style={{
                            fontSize: "20px",
                          }}
                        />
                      </Space>
                    ))}
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Form.Item
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "16px",
                            fontWeight: "500",
                            padding: "15px",
                            textAlign: "center",
                          }}
                          type="default"
                          onClick={() => {
                            add();
                            setIsAdd(true);
                          }}
                          block
                          icon={<PlusOutlined />}
                        >
                          Add Education Details
                        </Button>
                      </Form.Item>
                      {isAdd && (
                        <Form.Item style={{ marginLeft: "20px" }}>
                          <Button type="primary" htmlType="submit">
                            Submit
                          </Button>
                        </Form.Item>
                      )}
                    </span>
                  </>
                )}
              </Form.List>
          </Form>
        </>
      )}
    </>
  );
};
export default Academic;
