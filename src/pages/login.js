import { Button, Input } from '@mui/material';
import React from 'react'
import '../styles/pages/login.scss';
import { Wrapper } from '../components';

const Login = () => {

  return (
    <Wrapper>
      <div className='login-box'>
        <form className='login-form'>
          <Input type='text' />
          <Input type='password' />
          <Button type='submit'>Login</Button>
        </form>
      </div>
    </Wrapper>
  )
}

export default Login