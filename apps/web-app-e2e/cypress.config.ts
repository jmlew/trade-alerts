import { defineConfig } from 'cypress';

import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';

const cypressJsonConfig = {
  fileServerFolder: '.',
  fixturesFolder: './src/fixtures',
  video: true,
  videoCompression: 40,
  videosFolder: '../../dist/cypress/apps/web-app-e2e/videos',
  screenshotsFolder: '../../dist/cypress/apps/web-app-e2e/screenshots',
  chromeWebSecurity: false,
  specPattern: 'src/e2e/**/*.cy.{js,jsx,ts,tsx}',
  supportFile: 'src/support/e2e.ts',
  baseUrl: 'http://localhost:4200',
};
export default defineConfig({
  projectId: '7fq9n6',
  e2e: {
    ...nxE2EPreset(__dirname),
    ...cypressJsonConfig,
  },
  env: {
    dash_url: 'dash',
    users_url: 'users',
    reset_mock_users_url: 'api/users/reset',
  },
});
