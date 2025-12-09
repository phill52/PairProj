This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. **Install dependencies**

    [Install NPM](https://nodejs.org/en/download/package-manager)

    [Install Docker](https://docs.docker.com/engine/install/)

2. **Create env file**
   In the `next` directory create a file called `.env`. In this file, copy paste the contents from the latest message in the `dot-env` channel in the discord.

3. **Install Dependencies**
   ```bash
       npm install
   ```

4. **Set up local DB with Docker**

    Verify that docker is installed and running with the docker desktop app. Then run the following command in your terminal.

    ```bash
       docker-compose up -d
    ```

    Whenever you are out of development mode, you can close it with

    ```bash
       docker-compose stop
    ```

    If you ever need to reset the DB. ONLY USE IT IF YOU'RE SURE YOU'RE USING THE LOCAL DB.

    ```bash
      docker-compose down
    ```

    Then, finally seed the database. Run the commands

    ```bash
       npm run db:push
       npm run db:seed //Seed works but needs to be expanded
    ```

    When making any changes to the database, or pulling in someone else's changes, make sure you migrate your local DB.

    ```bash
      npx prisma migrate dev --name init
      npx prisma generate
    ```

5. **View local DB**

    If you want to view the contents of the database you can run the command. You can also test run SQL and Drizzle queries here.

    ```bash
       npm run db:studio
    ```

    If you want to more directly view it through PHPMyAdmin (which is unlikely necessary), you can optionally take these steps:
    First run

    Then go to localhost:8080 and login with the email and password in .env. Use the username and password from the `.env`.

6. Get development server running

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

    You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

    This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about our tech stack, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
-   [Prisma Documentation](https://www.prisma.io/docs/getting-started) - learn more about the ORM and features.
-   [AuthJS Documentation](https://authjs.dev/) - learn more about our local authentication system.
-   [Tailwind Documentation](https://v2.tailwindcss.com/docs) - learn more about our style solution.
-   [ShadCN UI](https://ui.shadcn.com/) - learn more about our component library.
