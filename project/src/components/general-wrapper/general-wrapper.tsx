import Header from "../header/header";
import {Outlet} from 'react-router-dom'
import Footer from "../footer/footer";

function GeneralWrapper (): JSX.Element {
  return (
    <>
      <Header />
      <main className="page-content">
        <Outlet />
      </main>
      <Footer />
    </>

  )
}
export default GeneralWrapper;
