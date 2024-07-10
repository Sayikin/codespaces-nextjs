// app/signin/page.tsx

'use client';

import { signIn } from 'next-auth/react';

const SignIn = () => {
  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={() => signIn('email')}>Sign in with Email</button>
    </div>
  );
};

export default SignIn;
