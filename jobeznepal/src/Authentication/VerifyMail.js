import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams,Link } from 'react-router-dom'
import Api from '../utills/Api'
import Login from "./Login"
import ReactLoading from "react-loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlassArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { CheckCircleOutlined } from '@ant-design/icons'

const VerifyMail = () => {
    const [validUrl, setValidUrl] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

const params = useParams();

    const verifyEMail = async () =>{
        setIsLoading(true)
        try {
            const verifyRequest = await Api.get(`/users/${params.id}/verify/${params.token}`)
            console.log(verifyRequest.data)
            setValidUrl(true)

        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        verifyEMail();
    }, [params])

  return (
    <>
    {isLoading ?
    (
        <ReactLoading type="cubes" color="red"/>

    ):(
        <>
        
        {validUrl ? (
             <div  style={{
    height:"100vh",
    display:"flex",
    flexDirection:"column",
    rowGap:"10px",
    justifyContent:"center",
    alignItems:"center",

        }}>
             <CheckCircleOutlined style={{
                fontSize:"100px",
                color:"green",
             }} />
             <h3>Verified Successfully, Please Proceed to login</h3>

             <Link to="/login" style={{
                backgroundColor:"#F13C20",
                padding:"10px 20px",
                borderRadius:"8px",
                color:"white",
    textDecoration:"none",


             }}>Login</Link>
             </div>
         
     ):(
        <div  style={{
    height:"100vh",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",

        }}>
             <div className='LogoBar'  >
      <Link to='/' className='LogoBarItems'>
      <FontAwesomeIcon icon={faMagnifyingGlassArrowRight} size='xl' className='logoIcon'   />
      <h5 style={{
        fontSize:"25px",

      }}>JobEzNepal</h5>
      </Link>
      </div>
      <br />
            <h1>404 Not Found</h1>
        </div>
     )}
        </>


    )}

    </>
  )
}

export default VerifyMail;