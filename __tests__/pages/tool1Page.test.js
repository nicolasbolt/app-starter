import { render } from '@testing-library/react';
import Tool1 from '../../app/tool1/page.jsx';

describe('Tool1 Page', () => {
    it('renders the Tool1 page correctly', () => {
        // Render the component
        const { container, getByText } = render(<Tool1 />);
        
        // Check that the component renders
        expect(container).toBeTruthy();
        
        // Check for the heading
        const heading = getByText('Tool 1');
        expect(heading).toBeTruthy();
        
        // Check that the heading has the correct class
        expect(heading.className).toContain('text-3xl');
        
        // Check that the container div has the correct classes
        const containerDiv = container.firstChild;
        expect(containerDiv.className).toContain('container');
        expect(containerDiv.className).toContain('mx-auto');
        expect(containerDiv.className).toContain('text-center');
        expect(containerDiv.className).toContain('mt-10');
    });
});