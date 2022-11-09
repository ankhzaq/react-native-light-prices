module.exports = {
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    [
      "tailwindcss-react-native/babel",
      { tailwindConfig: "./tailwind.native.config.js" },
      "@babel/plugin-transform-react-jsx"
    ],
  ]
};
