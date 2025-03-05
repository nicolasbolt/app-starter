import { render } from '@testing-library/react';
import Tool2 from '../../app/tool2/page.jsx';

describe('Tool2 Page', () => {
    it('renders the Tool2 page correctly', () => {
        // Render the component
        const { container, getByText } = render(<Tool2 />);
        
        // Check that the component renders
        expect(container).toBeTruthy();
        
        // Check for the heading
        const heading = getByText('Tool 2');
        expect(heading).toBeTruthy();
        
        // Check if any content exists in the container
        expect(container.textContent).toContain('Tool 2');
        
        // Check that the container has content
        expect(container.firstChild).toBeTruthy();
    });
});