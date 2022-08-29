module.exports = {
  stories: [],
  addons: [
    '@nrwl/react/plugins/storybook',
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
  ],
  // uncomment the property below if you want to apply some webpack config globally
  // webpackFinal: async (config, { configType }) => {
  //   // Make whatever fine-grained changes you need that should apply to all storybook configs

  //   // Return the altered config
  //   return config;
  // },
};
