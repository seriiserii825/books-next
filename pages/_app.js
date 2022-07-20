import '../assests/scss/my.scss';
import { Context } from '../context/Context';

function MyApp({ Component, pageProps }) {
	return (
		<Context>
			<Component {...pageProps} />
		</Context>
	);
}

export default MyApp;
