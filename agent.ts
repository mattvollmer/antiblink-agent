import * as slackbot from "@blink-sdk/slackbot";
import { convertToModelMessages, streamText } from "ai";
import blink from "blink";

export default blink.agent({
  async sendMessages({ messages }) {
    return streamText({
      model: "anthropic/claude-sonnet-4",
      system: "You are a helpful assistant.",
      messages: convertToModelMessages(messages),
      tools: {
        ...slackbot.tools({
          messages,
        }),
      },
    });
  },
  async webhook(request) {
    if (slackbot.isOAuthRequest(request)) {
      return slackbot.handleOAuthRequest(request);
    }
    if (slackbot.isWebhook(request)) {
      return slackbot.handleWebhook(request);
    }
  },
});
