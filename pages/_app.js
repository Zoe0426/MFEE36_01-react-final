import '@/styles/styleguide.css';
import '@/styles/memberCenter.css';
import DefaultLayout from '@/components/layout/default-layout';
import { AuthContextProvider } from '@/context/AuthContext';
import { ConfigProvider } from 'antd';

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <AuthContextProvider>
      {getLayout(
        <ConfigProvider
          theme={{
            token: {
              fontFamily: 'Noto Sans TC',
            },
          }}
        >
          <Component {...pageProps} />
        </ConfigProvider>
      )}
    </AuthContextProvider>
  );
}
