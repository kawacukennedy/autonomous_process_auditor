import { render, screen } from '@testing-library/react';
import Notification from '../src/components/Notification';

test('renders notification', () => {
  render(<Notification message="Test" type="info" onClose={() => {}} />);
  expect(screen.getByText('Test')).toBeInTheDocument();
});