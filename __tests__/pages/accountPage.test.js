import { render } from '@testing-library/react';
import AccountPage from '../../app/account/page';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

// Mock the imported modules
jest.mock('@/auth', () => ({
    auth: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    redirect: jest.fn(),
}));

// Mock the component imports
jest.mock('@/components/account/PersonalInfo', () => function MockPersonalInfo() {
    return <div data-testid="personal-info">Personal Info Component</div>;
});

jest.mock('@/components/account/Settings', () => function MockSettings() {
    return <div data-testid="settings">Settings Component</div>;
});

jest.mock('@/components/account/BillingInfo', () => function MockBillingInfo() {
    return <div data-testid="billing-info">Billing Info Component</div>;
});

describe('Account Page', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('redirects to signin page when no session exists', async () => {
        auth.mockResolvedValue(null);
        
        await AccountPage();
        
        expect(auth).toHaveBeenCalled();
        expect(redirect).toHaveBeenCalledWith('/signin');
    });

    it('renders the account page when session exists', async () => {
        // Mock a session
        const mockSession = { user: { name: 'Test User' } };
        auth.mockResolvedValue(mockSession);
        
        const { container } = render(await AccountPage());
        
        expect(auth).toHaveBeenCalled();
        expect(redirect).not.toHaveBeenCalled();
        // Check that the component renders without redirecting
        expect(container).toBeTruthy();
        // Check if any content exists
        expect(container.textContent).toBeTruthy();
    });
});