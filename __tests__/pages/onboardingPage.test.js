import { render } from '@testing-library/react';
import OnboardingPage1 from '../../app/onboarding/1/page.jsx';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

// Mock the imported modules
jest.mock('@/auth', () => ({
    auth: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    redirect: jest.fn(),
}));

// Mock the OnboardingUserData component
jest.mock('@/components/onboarding/OnboardingUserData', () => function MockOnboardingUserData() {
    return <div data-testid="onboarding-user-data">Onboarding User Data Component</div>;
});

describe('Onboarding Page', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('redirects to signin page with correct callback when no session exists', async () => {
        auth.mockResolvedValue(null);
        
        // Call the page component with no search params
        await OnboardingPage1({ searchParams: {} });
        
        expect(auth).toHaveBeenCalled();
        expect(redirect).toHaveBeenCalledWith('/signin?callbackUrl=/onboarding/1');
    });

    it('redirects to signin page with priceId when no session exists and priceId is provided', async () => {
        auth.mockResolvedValue(null);
        
        // Call the page component with priceId in search params
        await OnboardingPage1({ searchParams: { priceId: 'price_123' } });
        
        expect(auth).toHaveBeenCalled();
        expect(redirect).toHaveBeenCalledWith('/signin?callbackUrl=/onboarding/1?priceId=price_123');
    });

    it('renders the onboarding page when session exists', async () => {
        // Mock a session
        const mockSession = { user: { name: 'Test User' } };
        auth.mockResolvedValue(mockSession);
        
        const { container } = render(await OnboardingPage1({ searchParams: {} }));
        
        expect(auth).toHaveBeenCalled();
        expect(redirect).not.toHaveBeenCalled();
        // Check that the component renders without redirecting
        expect(container).toBeTruthy();
        // Check if any content exists
        expect(container.textContent).toBeTruthy();
    });

    it('renders the onboarding page when session exists with priceId', async () => {
        // Mock a session
        const mockSession = { user: { name: 'Test User' } };
        auth.mockResolvedValue(mockSession);
        
        const { container } = render(await OnboardingPage1({ searchParams: { priceId: 'price_123' } }));
        
        expect(auth).toHaveBeenCalled();
        expect(redirect).not.toHaveBeenCalled();
        // Check that the component renders without redirecting
        expect(container).toBeTruthy();
        // Check if any content exists
        expect(container.textContent).toBeTruthy();
    });
});