import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import AllRoutes from "./routes/AllRoutes";
import {Header, Footer} from "./components"
import './App.css';



function App() {
  return (
    <div className="bg-background font-sans">
      <Header/>
      <AllRoutes/>
      <Footer/>
    </div>
  );
}

export default App;
