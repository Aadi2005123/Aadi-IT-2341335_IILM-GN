import dotenv from "dotenv";
dotenv.config();
dotenv.config({quiet: true});

export const ENV={
    PORT: process.env.PORT,
};
