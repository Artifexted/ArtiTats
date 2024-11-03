import Style from "./Home.module.css";

function Home() {
	return (
		<>
			<h1 className={Style.title}>Welcome to Artitats</h1>
			<p className={Style.description}>
				Your space for personal expression through the art of tattooing.
			</p>
		</>
	);
}

export default Home;
