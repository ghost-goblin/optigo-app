import { render, screen } from '@testing-library/react';
import FunFactsPage from './components/NavBar';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
  useStore: jest.fn(),
}));

test('renders the landing page', () => {
  render(<FunFactsPage />);
});