import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import loginImg from './login.png';
import './Login.css'; // Certifique-se de que o arquivo CSS está no caminho correto

const FormItem = Form.Item;

function Login() {
  const [message, setMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // Estado para o checkbox
  const navigate = useNavigate(); // Hook para navegação

  const handleSubmit = async (values) => {
    try {
      const response = await fetch('http://localhost:3001/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ registration: Number(values.registration), password: values.password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.acessToken);
        setMessage('Login bem-sucedido!');
        navigate('/home'); // Redireciona para a página inicial
      } else {
        const errorText = await response.text();
        setMessage(`Falha no login: ${errorText}`);
      }
    } catch (error) {
      setMessage(`Falha no login: ${error.message}`);
    }
  };

  return (
    <div className="lContainer">
      <div className="lItem">
        <div className="loginImage">
          <img src={loginImg} width="300" style={{ position: 'relative' }} alt="login" />
        </div>
        <div className="loginForm">
          <h2>Login</h2>
          <Form onFinish={handleSubmit} className="login-form">
            <FormItem name="registration">
              <Input
                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Registration"
                type="number"
              />
            </FormItem>
            <FormItem name="password">
              <Input
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />
            </FormItem>
            <FormItem>
              <Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}>
                Remember me
              </Checkbox>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </FormItem>
          </Form>
          {message && <p>{message}</p>}
        </div>
      </div>
      <div className="footer">
        <span className="footer">Powered by iuri</span>
      </div>
    </div>
  );
}

export default Login;