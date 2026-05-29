import { render, screen } from '@testing-library/react';
import { CodexNote } from '@/components/CodexNote';

describe('CodexNote', () => {
  const props = {
    title: 'The Jade Blade School',
    preview: 'This style traces to the real Wudang lineage...',
    section: 'martial',
    slug: 'jade-blade',
    locale: 'en',
  };

  it('renders the title', () => {
    render(<CodexNote {...props} />);
    expect(screen.getByText('The Jade Blade School')).toBeInTheDocument();
  });

  it('renders the preview text', () => {
    render(<CodexNote {...props} />);
    expect(screen.getByText(/Wudang lineage/)).toBeInTheDocument();
  });

  it('renders a link to the correct codex entry', () => {
    render(<CodexNote {...props} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/en/codex/martial/jade-blade');
  });
});
