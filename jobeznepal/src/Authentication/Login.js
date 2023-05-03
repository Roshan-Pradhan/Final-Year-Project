import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, } from 'antd';
import "./Register.css"
import {Link } from "react-router-dom"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faMagnifyingGlassArrowRight } from '@fortawesome/free-solid-svg-icons'
import Api from '../utills/Api';
import {  useState } from 'react';
import ReactLoading from "react-loading";


const Login = ({setFromLogin}) => {
  const [isLoading, setIsLoading] = useState(false);
  const onFinish =  async (values) => {
    const {email,password} = values;
    setIsLoading(true);
    try {
      const userLogin =  await Api.post("/login",{
        email,password
      })
      if(userLogin.status===200 && userLogin.data.doUserExist.verified===true){
        message.success({
          content:`Welcome ${email}`,
          className:"cutomMessagePrompt"
      })
      setFromLogin(userLogin.data.doUserExist.usertype)
        window.localStorage.setItem (
          "jobeznepalUser",
           JSON.stringify(userLogin?.data)
         );
         window.localStorage.setItem("isLoggedIn",true);
         window.location.href = "./userProfile";

      }
    } catch (error) {
      message.error(error.response.data)
      console.log(error)
    }
    setIsLoading(false);

    // console.log('Received values of form: ', values);
  };

  
  return (
    <div className="registerPage">
  <div className='LogoBar'>
      <Link to='/' className='LogoBarItems'>
      <FontAwesomeIcon icon={faMagnifyingGlassArrowRight} size='xl' className='logoIcon'   />
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
        <h2>Login Form</h2>

      <Form.Item
        name="email"
        // className='formItem'
        rules={[
          {
            required: true,
            message: 'Please enter your Email!',
          },
        ]}
      >
        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email"  />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please enter your Password!',
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      {isLoading ? (
              <ReactLoading type="cubes" color="red"/>
            ):(
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Login
        </Button>
      </Form.Item>
            )}
    </Form>
    </div>

  );
};
export default Login;