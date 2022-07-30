import '../assests/scss/my.scss';
import { Context } from '../context/Context';
import axios from 'axios';

axios.defaults.baseURL = 'https://localhost:8088/api';

function MyApp({ Component, pageProps }) {
	return (
		<Context>
			<Component {...pageProps} />
		</Context>
	);
}

export default MyApp;
