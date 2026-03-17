import { test, expect, Page } from '@playwright/test';
import { authenticateFullAccess } from '../common/authentication';
import { config } from '../../curlingrink.config';



test('can create new request', async ({ page }) => {

  await page.goto('/');
  await authenticateFullAccess(page);
  let uniqueTitle = 'Test ' + crypto.randomUUID();

  await page.getByRole('link', { name: 'Requests' }).click();
  await page.getByRole('button', { name: 'New request' }).click();
  await page.getByRole('textbox', { name: 'Search contacts...' }).click();
  await page.getByRole('textbox', { name: 'Search contacts...' }).pressSequentially(config.planner.defaultContactEmail);
  await page.locator(`span[email="${config.planner.defaultContactEmail}"]`).click();
  await expect(page.getByText(config.planner.defaultContactName, { exact: true })).toBeVisible();
  await page.getByRole('textbox', { name: 'Contact Title' }).click();
  await page.getByRole('textbox', { name: 'Contact Title' }).fill(uniqueTitle);
  await page.getByRole('spinbutton', { name: 'Amount of People' }).click();
  await page.getByRole('spinbutton', { name: 'Amount of People' }).fill('1');
  await page.getByRole('textbox', { name: 'Additional Information' }).click();
  await page.getByRole('textbox', { name: 'Additional Information' }).fill('Extra info');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByRole('heading', { name: uniqueTitle })).toBeVisible();
});
