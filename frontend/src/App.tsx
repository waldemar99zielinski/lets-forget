import { BrowserRouter } from 'react-router-dom';

import { AppRouter } from './router/AppRouter';
import { ThemeProvider } from './context/theme/ThemeProvider';
import { AuthProvider } from './context/auth/AuthProvider';
import { AlertProvider } from './context/alerts/AlertProvider';
import { UserProvider } from './context/user/UserProvider';

function App() {
	return <BrowserRouter>
		<ThemeProvider>
			<AlertProvider>
				<AuthProvider>
					<UserProvider>
						<AppRouter />
					</UserProvider>
				</AuthProvider>
			</AlertProvider>
		</ThemeProvider>
	</BrowserRouter>;
}

export default App;
