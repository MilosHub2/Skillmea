import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({
  path: `./env/.env.${process.env.ENV}`
});

export default defineConfig({
  testDir: './tests',
  testIgnore: ['tests/api.spec.ts'],
  timeout: 30 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', { open: 'always' }],
    ['allure-playwright'],
    ['json', { outputFile: 'test-results.json' }],
    [
      './node_modules/playwright-slack-report/dist/src/SlackReporter.js',
      {
        channels: ['#all-milosslack'],
        sendResults: 'always',
        meta: [
          {
            key: 'Merged to branch',
            value: `${process.env.GITHUB_REF_NAME}`
          },
          {
            key: 'Author',
            value: `${process.env.GITHUB_ACTOR}`
          }
        ]
      }
    ]
  ],

  use: {
    baseURL: 'http://google.com',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: {
      mode: 'retain-on-failure',
      size: { width: 640, height: 480 }
    }
  },

  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/, fullyParallel: false },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});