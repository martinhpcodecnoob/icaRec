import React, { useState } from "react";
import { signIn } from 'next-auth/react'

const LoginButton = () => {

  return (
    <div>
      <button onClick={() => signIn('google')}>Google</button>
    </div>
  );
};

export default LoginButton;