This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. **Install dependencies**

    [Install NPM](https://nodejs.org/en/download/package-manager)

    [Install Docker](https://docs.docker.com/engine/install/)

2. **Create env file**
   write this at some point

3. **Set up local DB with Docker**

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
       npm run db:seed //SEED IS STILL A TODO
    ```

    When making any changes to the database, or pulling in someone else's changes, make sure you migrate your local DB.

    ```bash
      npm run db:generate
      npm run db:migrate
    ```

4. **View local DB**

    If you want to view the contents of the database you can run the command. You can also test run SQL and Drizzle queries here.

    ```bash
       npm run db:studio
    ```

    If you want to more directly view it through PGAdmin (which is unlikely necessary), you can optionally take these steps:
    First run

    ```bash
      docker container ls
    ```

    and copy the hash of the postgres image. You can then run

    ```bash
      docker inspect <hash>
    ```

    Scroll up a little, and you will see an IPaddress. Copy this. Then go to localhost:5050 and login with the email and password in .env. Click add new server, and go over to the connections tab. Put the IPaddress as the hostname/address in the connections, and take the username/password from the .env file.

5. Get development server running
   First, install necessary packages

    ```bash
    npm i
    ```

    Lastly, run the development server:

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
-   [Drizzle Documentation](https://orm.drizzle.team/docs/overview) - learn more about the ORM and features.
-   [AuthJS Documentation](https://authjs.dev/) - learn more about our local authentication system.
-   [Tailwind Documentation](https://v2.tailwindcss.com/docs) - learn more about our style solution.
-   [ShadCN UI](https://ui.shadcn.com/) - learn more about our component library.
