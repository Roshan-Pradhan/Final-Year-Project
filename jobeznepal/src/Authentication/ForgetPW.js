import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import "./Register.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassArrowRight } from "@fortawesome/free-solid-svg-icons";
import Api from "../utills/Api";
import { useState } from "react";
import ReactLoading from "react-loading";

const ForgetPW = ({ setFromLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    const { email, password } = values;
    console.log(email,password)
    setIsLoading(true);
    try {
      const userLogin = await Api.put("/forgetPW", {
        email,
        password,
      });
      message.success(userLogin.data.Message);
      window.location.href = "./login";

    } catch (error) {
      message.error(error.response.data.Message);
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
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
        <h2>Password Recover</h2>

        <Form.Item
          name="email"
          // className='formItem'
          rules={[
            {
              required: true,
              message: "Please enter your registered Email!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Registered Email"
          />
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
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder=" Change Password"
          />
        </Form.Item>

        {isLoading ? (
          <ReactLoading type="cubes" color="red" />
        ) : (
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Submit
            </Button>
          </Form.Item>
        )}
      </Form>
    </div>
  );
};
export default ForgetPW;
