/* eslint-disable */
export default {
  displayName: 'dashboard-feature-data-provider',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../../coverage/libs/dashboard/feature/data-provider',
};
