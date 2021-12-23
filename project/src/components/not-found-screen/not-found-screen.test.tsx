import { render, screen } from "@testing-library/react"
import { Router } from "react-router-dom"
import {createMemoryHistory} from 'history';
import NotFoundScreen from "./not-found-screen"


describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router navigator={history} location={''}>
        <NotFoundScreen />
      </Router>
    )

    expect(screen.getByText('Такой страницы не существует')).toBeInTheDocument();
    expect(screen.getByText('ВЕРНУТЬСЯ НА ГЛАВНУЮ')).toBeInTheDocument();
  })
})