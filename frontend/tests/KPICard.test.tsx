import { render, screen } from '@testing-library/react';
import KPICard from '../src/components/KPICard';

test('renders KPI card', () => {
  render(<KPICard title="Test" value="100" />);
  expect(screen.getByText('Test')).toBeInTheDocument();
});