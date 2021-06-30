import { TelegramClient, Api } from "telegram";
import { StringSession } from "telegram/sessions";

const apiId = parseInt(process.env.GATSBY_TELEGRRAM_API_ID || "");
const apiHash = process.env.GATSBY_TELEGRRAM_API_HASH || "";
const stringSession = new StringSession(""); // fill this later with the value from session.save()

const client = new TelegramClient(stringSession, apiId, apiHash, {
  connectionRetries: 5,
});

export default client;

// (async () => {
//   console.log("Loading interactive example...");
//   await client.start({
//     phoneNumber: async () => await input.text("number ?"),
//     password: async () => await input.text("password?"),
//     phoneCode: async () => await input.text("Code ?"),
//     onError: (err: any) => console.log(err),
//   });
//   console.log("You should now be connected.");
//   console.log(client.session.save()); // Save this string to avoid logging in again
//   await client.sendMessage("me", { message: "Hello!" });
// })();
