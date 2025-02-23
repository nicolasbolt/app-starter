# SaaS Starter Code

## Getting Started

First, create a .env file and add the auth secret

```bash
npx auth secret
```

Now we need to setup Google OAuth:

1. Go to console.cloud.google.com and login
2. In the search bar at the top, search for "oauth" and select Credentials
3. Create Credentials -> OAuth Client ID

There are two sections here when you create new credentials

Authorized Javascript Origins:
- This should include http://localhost:3000
- Also add any custom domains you would like to use here too

Authorized Redirect URLs:
- http://localhost:3000/api/auth/callback/google
- Also add any custom domains here in the same format {CUSTOM_DOMAIN}/api/auth/callback/google

Then, in the env file (.env.local) add the following env variables, replacing the values from the Google OAuth Console:

```
AUTH_GOOGLE_ID=1{google_id}
AUTH_GOOGLE_SECRET={google_secret}
```


# TODO
- stripe api integration with onboarding flow (NEED TO TEST)
- user route (NEED TO TEST)
- signin page callback url
- hide sidebar in onboarding