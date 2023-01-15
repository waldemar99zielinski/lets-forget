import { BrowserRouter } from 'react-router-dom';

import { AppRouter } from './router/AppRouter';
import { ThemeProvider } from './context/theme/ThemeProvider';
import { AuthProvider } from './context/auth/AuthProvider';
import { AlertProvider } from './context/alerts/AlertProvider';

function App() {
	return <BrowserRouter>
		<ThemeProvider>
			<AuthProvider>
				<AlertProvider>
					<AppRouter />
				</AlertProvider>
			</AuthProvider>
		</ThemeProvider>
	</BrowserRouter>;
}

export default App;
