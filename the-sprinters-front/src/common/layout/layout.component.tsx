import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AppShell, AppShellFooter } from '@mantine/core';
import { withAuth } from '@/src/common/hoc/with-auth';
import Header from './header.component';
import Footer from './footer.component';
import Sidebar from '@/src/common/layout/sidebar.component';

interface ILayoutProps {
  children: React.ReactNode;
}

function Layout(props: ILayoutProps) {
  const { children } = props
  const configuredNonLayoutRoutes = [
    "/login",
    "/authentication",
    "/forgot-password",
    "/learn",
    "/community",
  ]
  const [shouldDisplayLayout, setShouldDisplayLayout] = useState(false)

  const router = useRouter()

  useEffect(() => {
  }, []);

  useEffect(() => {
    setShouldDisplayLayout(
      configuredNonLayoutRoutes.indexOf(router.pathname) === -1
    );
  }, [router.pathname]);


  return (
    <AppShell
      style={{
        height: '100%',
        paddingBottom: `100px`,
        minHeight: '100vh',
        width: '100%',
      }}
    >
      {shouldDisplayLayout &&
        <>

          <AppShell.Header>
            <Header />
          </AppShell.Header>
          <AppShellFooter>
            <Footer />
          </AppShellFooter>
          
        </>
      }{children}
    </AppShell>
  )
}

export default withAuth(Layout)