import {AppProps} from "next/dist/next-server/lib/router/router";
import "../styles/global.scss";
import 'highlight.js/styles/github-dark.css';

const App = ({Component, pageProps}: AppProps) => {
    return <Component {...pageProps} />;
};

export default App;
