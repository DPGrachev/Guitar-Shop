import Footer from '../footer/footer';
import Header from '../header/header';

function MainScreen (): JSX.Element {
  return (
    <>
      <Header />
      <main className="page-content">
        <h1>Главная страница</h1>
      </main>
      <Footer />
    </>
  );
}

export default MainScreen;
