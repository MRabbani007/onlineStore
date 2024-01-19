import { MdEdit } from "react-icons/md";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      content: {
        editicon: 'url("/images/pen-solid.svg")',
      },
    },
  },
  plugins: [],
};
