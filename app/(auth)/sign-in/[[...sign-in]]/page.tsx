'use client';
import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import {useRouter} from 'next/navigation';
import { signIn } from 'next-auth/react';

const Login = () => {
   const router = useRouter();
    
    type FieldType = {
        username?: string;
        password?: string;
      };
      
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values);
        
    //POST SNIPPET TO CREATE ROW IN USER DB
    // const resp = await fetch('/api/user',{
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         username: values.username,
    //         password: values.password,
    //         email: 'hardcoded@mail.com'
    //     }),
    // })
    // console.log("Response status: ",resp.status,resp.ok)
    // if(resp.ok){
    //     router.push('/dashboard');
    // }else{
    //     console.log("Login failed");
    // }
    

    const signInData = await signIn('credentials', {
        username: values.username,
        password: values.password
    })
    console.log("login data: ",signInData)
    if(signInData?.error){
        console.log(signInData.error);
    }else{
        router.push('/dashboard')
    }
    };
      
    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return(
    <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
        >
        <Input />
        </Form.Item>

        <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
        >
        <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
            Submit
        </Button>
        </Form.Item>
    </Form>
    )
};

export default Login;