import {Inngest} from "inngest";
import {connectDB} from "./db.js";
import User from "../models/User.js";

export const inngest = new Inngest({ id: "Test-IQ" });

const syncUser = inngest.createFunction(
    {id: "sync/user"},
    {event: "clerk.user.created"},
    async ({event}) => {
        await connectDB();


        const{id, email_address, first_name, last_name, image_url} = event.data; // get the user data from the event payload
const newUsser={
    clearrkId:id,
    email:email_address[0]?.email_address,
    name: `${first_name || ""} ${last_name || ""}`,
    profileImage:image_url
}
await User.create(newUsser);

    }
)

const deleteUserFromDB = inngest.createFunction(
    {id: "delete-user-from-db"},
    {event: "clerk.user.deleted"},
    async ({event}) => {
        await connectDB();


        const{id} = event.data; // get the user data from the event payload

await User.deleteOne({clearrkId:id});



    }
);
export const functions = [syncUser, deleteUserFromDB];    