import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import KPICard from '../KPICard';

describe('KPICard', () => {
  it('renders title, value, and change', () => {
    render(<KPICard title="Test KPI" value="100" change="+10%" icon="📊" />);
    expect(screen.getByText('Test KPI')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('+10%')).toBeInTheDocument();
  });
});