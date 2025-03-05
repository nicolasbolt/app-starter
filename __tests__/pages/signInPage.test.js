import { render } from '@testing-library/react';
import SignInPage from '../../app/signin/page';
import { signIn, auth, providerMap } from "@/auth";

// Mock the imported modules
jest.mock('@/auth', () => ({
    signIn: jest.fn(),
    auth: jest.fn(),
    providerMap: [
        { id: 'google', name: 'Google' }
    ]
}));

// Mock the UI components
jest.mock('@/components/ui/button', () => ({
    Button: ({ children, ...props }) => <button {...props}>{children}</button>
}));

jest.mock('@/components/ui/card', () => ({
    Card: ({ children, ...props }) => <div {...props}>{children}</div>,
    CardHeader: ({ children }) => <div>{children}</div>,
    CardTitle: ({ children }) => <h2>{children}</h2>,
    CardDescription: ({ children }) => <p>{children}</p>,
    CardContent: ({ children }) => <div>{children}</div>
}));

// Mock the constants - use a string instead of JSX
jest.mock('@/lib/constants', () => ({
    providerLogoMap: {
        google: "Google Logo"
    }
}));

describe('SignIn Page', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the sign in page with default callback URL', async () => {
        const { container } = render(await SignInPage({ searchParams: {} }));
        
        // Check that the component renders
        expect(container).toBeTruthy();
        expect(container.textContent).toContain('Sign In');
        expect(container.textContent).toContain('To Continue To Your Account');
    });

    it('renders the sign in page with provided callback URL', async () => {
        const { container } = render(await SignInPage({ 
            searchParams: { callbackUrl: '/dashboard' } 
        }));
        
        // Check that the component renders
        expect(container).toBeTruthy();
        expect(container.textContent).toContain('Sign In');
    });

    it('includes email input field and sign in button', async () => {
        const { container } = render(await SignInPage({ searchParams: {} }));
        
        // Check for email input
        const emailInput = container.querySelector('input[name="email"]');
        expect(emailInput).toBeTruthy();
        
        // Check for sign in button
        const signInButton = container.querySelector('button[type="submit"]');
        expect(signInButton).toBeTruthy();
        expect(signInButton.textContent).toContain('Sign in');
    });

    it('includes OAuth provider buttons', async () => {
        const { container } = render(await SignInPage({ searchParams: {} }));
        
        // Since we mocked providerMap with one provider (Google)
        // Check for the Google sign in button
        expect(container.textContent).toContain('Sign in with Google');
    });
});