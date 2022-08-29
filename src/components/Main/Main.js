import React from 'react';
import { useUser } from '../../services/User';
import { AboutMe } from '../AboutMe/AboutMe';
import { AboutProject } from '../AboutProject/AboutProject';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { Portfolio } from '../Portfolio/Portfolio';
import { Promo } from '../Promo/Promo';
import { Tech } from '../Tech/Tech';

export const Main = () => {
	const { user } = useUser();
	
	return (
		<main>
			<Header isAuth={user} />
			<Promo />
			<AboutProject />
			<Tech />
			<AboutMe />
			<Portfolio />
			<Footer />
		</main>
	);
}