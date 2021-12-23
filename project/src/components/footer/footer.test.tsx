import { render, screen } from "@testing-library/react"
import { Router } from "react-router-dom"
import {createMemoryHistory} from 'history';
import Footer from "./footer";


describe('Component: Footer', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router navigator={history} location={''}>
        <Footer />
      </Router>
    )

    expect(screen.getByText('О нас')).toBeInTheDocument();
    expect(screen.getByText('Информация')).toBeInTheDocument();
    expect(screen.getByText('Блог')).toBeInTheDocument();
    expect(screen.getByText('Контакты')).toBeInTheDocument();
    expect(screen.getByText(/м. Невский проспект,/i)).toBeInTheDocument();
    expect(screen.getByText('без выходных')).toBeInTheDocument();

  })
})