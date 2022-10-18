# My Data For Followers

This is a tool made for you to exchange your data for followers on Instagram.

## Running

Create a file called `.env` at the root of the project with the same structure as the `.env.example` file (for development mode you don't need to replace the `DATABASE_URL` because this is docker data) add the values in the variables that there is not. (`LIONS_API_KEY` is an api key from [https://lionsprovedor.com/api](https://lionsprovedor.com/api))

After that just run `pnpm init:dev` and all the initial settings will be generated. Then run `pnpm dev`
