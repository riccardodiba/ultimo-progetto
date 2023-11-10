import { Container } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/style.css'
import Main from './components/Main';
import AlbumCard from './components/AlbumCard'
import SideBar from './components/SideBar';
import FooterPlay from './components/FooterPlay';

function App() {
  return (
    <Container>
      <SideBar />
       <Main />
       <AlbumCard />
   
     <FooterPlay />

    </Container>
  );
}

export default App;