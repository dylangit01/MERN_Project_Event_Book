import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Footer from './components/Footer/Footer';
import About from './components/About/About';

const theme = createMuiTheme({
	typography: {
		fontFamily: ['Ubuntu', 'sans-serif'],
	},
});

const App = () => {
	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<Container maxWidth='lg'>
					<Navbar />
					<Switch>
						<Route path='/' exact component={Home} />
						<Route path='/auth' exact component={Auth} />
					</Switch>
				</Container>
				<Route path='/about' component={About} />
				<Footer />
			</ThemeProvider>
		</BrowserRouter>
	);
};

export default App;
