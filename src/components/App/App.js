import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Main } from "../Main/Main";
import { Movies } from "../Movies/Movies";
import "./App.css";

export const App = () => {
  return (
    <div className="app">
      <Header />
      {/* <Main/> */}
      <Movies/>
      <Footer />
    </div>
  );
}