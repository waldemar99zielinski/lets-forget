import { BrowserRouter } from 'react-router-dom';

import { AppRouter } from './router/AppRouter';
import { ThemeProvider } from './context/theme/ThemeProvider';
import { AuthGuardProvider } from './context/guards/AuthGuard/AuthGuardProvider';
import { AlertProvider } from './context/alerts/AlertProvider';

function App() {
	return <BrowserRouter>
		<ThemeProvider>
			<AuthGuardProvider>
				<AlertProvider>
					<AppRouter />
				</AlertProvider>
			</AuthGuardProvider>
		</ThemeProvider>
	</BrowserRouter>;
}

export default App;
