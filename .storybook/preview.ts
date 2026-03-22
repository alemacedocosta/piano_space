import type { Preview } from "@storybook/react";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "sand",
      values: [
        { name: "sand", value: "#FAF3E0" },
        { name: "white", value: "#FFFFFF" },
        { name: "navy", value: "#152B3C" },
      ],
    },
    layout: "padded",
  },
};

export default preview;
