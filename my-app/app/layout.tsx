import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { Session } from 'next-auth';

type LayoutProps = {
  children: ReactNode;
  session: Session | null;
};

const RootLayout = ({ children, session }: LayoutProps) => {
  return (
    <html>
      <head />
      <body>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;

