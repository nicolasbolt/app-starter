# SaaS Starter Code

## Built With

* [![Next][Next.js]][Next-url]
* [![MongoDB][MongoDB]][MongoDB-url]
* [![NextAuth][NextAuth]][NextAuth-url]
* [![Stripe][Stripe]][Stripe-url]
* [![Jest][Jest]][Jest-url]

[Next.js]: https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[MongoDB]: https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[NextAuth]: https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[NextAuth-url]: https://next-auth.js.org/
[Stripe]: https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white
[Stripe-url]: https://stripe.com/
[Jest]: https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white
[Jest-url]: https://jestjs.io/


## Getting Started

This guide can be used to get the project running.  There are various env vars, external settings, etc that need to be applied.  

## Prerequisites

### Install Node.js and npm

1. Download the Node.js installer from the [official Node.js website](https://nodejs.org/).
2. Run the installer and follow the instructions to complete the installation.
3. Verify the installation by running the following commands in your terminal:

```bash
node -v
npm -v
```

You should see the version numbers of Node.js and npm printed in the terminal.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/nicolasbolt/app-starter.git
```

2. Navigate to the project directory:

```bash
cd app-starter
```

3. Install the dependencies:

```bash
npm install
```

### Setup MongoDB

1. Go to MongoDB Atlas and create a free hosted database
2. Get the connection string, create a collection in the database and add it to the .env file:

`MONGODB_URI=mongodb+srv://<username>:<user_password>@<url>`



### Setup User Authentication

First, create a .env file and add the auth secret:

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

Now let's setup the email provider for Magic Links:
In the .env file, add this env variable and follow the setup for the Sendgrid provider:

`AUTH_SENDGRID_KEY={AUTH_KEY}`

### Setup Stripe API Integration

1. Open up the Stripe Test Dashboard
2. On the left, go to Product Catalog
3. Create Product
4. After creating product, open that product and on the 3 dots for the pricing, you should see 'Copy Price ID'.  This is the ID needed to be used in this app for opening the correct payment screen.
5. Go back to the dashboard
6. On the left, go to 'Payment Links'
7. Create a new one with the 'New' button
8. Choose the product you just created
9. Choose your settings for the payment page
10. Go to the After Payment tab
11. Choose 'Don't show confirmation page
    - Either redirect to http://localhost:300
    - Or replace this with whatever your dashboard url is when you deployed the app
12. Create Link
13. You should now see a link you can copy
14. Replace this link wherever a stripe link is required

## Routes

Run the dev server:
```bash
npm run dev
```

### Home Page

Go to http://localhost:3000 to get to the homepage, you will have to login before navigating to the different pages of the app

### Onboarding

After creating a Stripe price page, you can go through the onboarding flow with the price id from the Stripe setup by going to http://localhost:3000/onboarding/1?priceId={PRICE_ID}

### Tests
You can run the tests with:

```
npm run test
```

### CI/CD
There are two CI/CD pipelines both have the same stages:
- Build
- Test
- Deploy

deploy-prod.yml will run when a commit is pushed to the main branch.
deploy-dev.yml will run when a commit is pushed to the dev branch.

## License
Distributed under the MIT License.  See `LICENSE` for more information.

## Contact
Need development work completed?  Contact me here:
[My Portfolio](https://nicolasbolt.com)

My LinkedIn Profile:
[LinkedIn](https://www.linkedin.com/in/nicolas-bolt-59a523131/)

See my marketing website that goes well with this project:
[Marketing Landing Page Template](https://github.com/nicolasbolt/marketing-boilerplate)

## Acknowledgments
Here are some libraries and useful tools I used to build this project.

* [shadcn](https://github.com/shadcn)
* [lucide-react](https://github.com/lucide-icons/lucide)
* [tailwindcss](https://tailwindcss.com/)
