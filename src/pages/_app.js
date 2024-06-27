
import { Providers } from '@/app/provider';
import '../app/globals.css'
import Header from '@/components/navbar/page';
import Footer from '@/components/footer/page';

function MyApp({ Component, pageProps }) {
    return (
        <Providers>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </Providers>
    );
}

export default MyApp;