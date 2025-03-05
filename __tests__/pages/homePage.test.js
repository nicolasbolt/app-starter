import { render } from '@testing-library/react';
import Home from '../../app/page';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

// Mock the imported modules
jest.mock('@/auth', () => ({
    auth: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    redirect: jest.fn(),
}));

describe('Home Page', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('redirects to signin page when no session exists', async () => {
        auth.mockResolvedValue(null);
        
        await Home();
        
        expect(auth).toHaveBeenCalled();
        expect(redirect).toHaveBeenCalledWith('/signin');
    });

    it('renders the home page when session exists', async () => {
        auth.mockResolvedValue({ user: { name: 'Test User' } });
        
        const { container } = render(await Home());
        
        expect(auth).toHaveBeenCalled();
        expect(redirect).not.toHaveBeenCalled();
        // Check that the component renders without redirecting
        expect(container).toBeTruthy();
        // Check if any content exists
        expect(container.textContent).toBeTruthy();
    });
});