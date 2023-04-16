import {
  LockOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  UserSwitchOutlined,
  SelectOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, message, Select } from "antd";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassArrowRight } from "@fortawesome/free-solid-svg-icons";
import Api from "../utills/Api";
import ReactLoading from "react-loading";
import { useState } from "react";

const Register = () => {
  const history = useNavigate();
  const { Option } = Select;
  const [isLoading, setIsLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState('')

  //sending user info to schema
  const onFinish = async (values) => {
    const { username, mobilenumber, email, gender, usertype, password } =
      values;
      setIsLoading(true);

    try {
      const registerUser = await Api.post("/register", {
        username,
        mobilenumber,
        email,
        gender,
        usertype,
        password,
      });
      setServerMessage(registerUser.data.Message)
      // message.success(registerUser.data.Message);
      console.log(registerUser);

      // history("/login");

    } catch (error) {
      message.error(error.response.data);
      console.log(error);
    }
    setIsLoading(false);
    console.log("Received values of form: ", values);
  };

  return (
    <>
   
        <div className="registerPage">
          <div className="LogoBar">
            <Link to="/" className="LogoBarItems">
              <FontAwesomeIcon
                icon={faMagnifyingGlassArrowRight}
                size="xl"
                className="logoIcon"
              />
              <h5>JobEzNepal</h5>
            </Link>
          </div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            {serverMessage  && 
            <p style={{
              color:"green",
              fontWeight:"500",
              fontSize:"17px",
            }}>{serverMessage}</p>
            }
            <h2>Register Form</h2>
            <Form.Item
              name="username"
              // className="formItem"
              rules={[
                {
                  required: true,
                  message: "Please enter your Username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item
              name="mobilenumber"
              rules={[
                {
                  required: true,
                  message: "Please enter your Mobilenumber!",
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined className="site-form-item-icon" />}
                placeholder="Phonenumber"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your Email!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                suffixIcon={<SelectOutlined />}
                placeholder="Select Your Gender"
                allowClear
              >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="usertype"
              label="User Type"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                suffixIcon={<UserSwitchOutlined />}
                placeholder="Who you are?"
                allowClear
              >
                <Option value="provider">Job Provider</Option>
                <Option value="seeker">Job Seeker</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            {isLoading ? (
              <ReactLoading type="cubes" color="red"/>
            ):(
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Register
              </Button>
              Or <Link to="/login">Already Have an account?</Link>
            </Form.Item>
            ) }
          </Form>
        </div>
     
    </>
  );
};
export default Register;
