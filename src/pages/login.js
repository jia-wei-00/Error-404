import { Button, Input } from '@mui/material';
import React, { useState } from 'react';
import { useRunOnce } from '../custom-hook';
import '../styles/pages/login.scss';
import { Wrapper } from '../components';
import { observer } from 'mobx-react-lite';
import { firebaseStore } from '../store';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useRunOnce(async () => {
    await firebaseStore.getUserAuth();

    if (firebaseStore.user) {
      Navigate('./home');
    }
  }, [firebaseStore.user]);

  return (
    <Wrapper>
      <div className='login-box'>
        <form className='login-form'>
          <Input type='text' onChange={(e) => setUsername(e.target.value)} value={username} />
          <Input type='password' onChange={(e) => setPassword(e.target.value)} value={password} />
          {/* <Button type='submit' onClick={(e) => firebaseStore.signInAPI()}>Login</Button> */}
          <p className='hello'>CoinWatch</p>
        </form>
      </div>
    </Wrapper>
  )
}

export default observer(Login)