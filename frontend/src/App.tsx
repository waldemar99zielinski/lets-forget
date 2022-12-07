import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import {AppRouter} from './router/AppRouter';
import {ThemeProvider} from './context/theme/ThemeProvider';

function App() {

	return <BrowserRouter>
		{/* <ThemeProvider> */}
			<AppRouter />
		{/* </ThemeProvider> */}
	</BrowserRouter>;
}

export default App;
