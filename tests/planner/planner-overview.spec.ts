import { test, expect, Page } from '@playwright/test';
import { authenticateFullAccess } from '../common/authentication';

async function deleteActivity(page: Page, title: string) {
  await page.getByText(title).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => { });
  });
  await page.getByRole('button', { name: 'Delete' }).click();
  await expect(page.getByText(title)).not.toBeVisible();
}

async function makeActivityWithoutSaving(page: Page, title: string, startTime: string, endTime: string) {
  await page.locator(`[id="2803985e-3740-4e8f-a5a4-281336d096a9"] > div[time="${startTime}"]`).click();
  //Wait to be sure sure we can create a longer activity
  await page.waitForTimeout(100);
  await page.locator(`[id="2803985e-3740-4e8f-a5a4-281336d096a9"] > div[time="${endTime}"]`).click();
  await page.getByLabel('Activity Type').selectOption('7a9870c0-e333-4ed9-a759-7e1072aa2dd7');
  //Pop-up opens here
  await page.getByRole('textbox', { name: 'Title' }).click();
  await page.getByRole('textbox', { name: 'Title' }).fill(title);
  await expect(page.locator('input[name="startTime"]')).toHaveValue(startTime);
  await expect(page.locator('input[name="endTime"]')).toHaveValue(endTime);
}


test('can create new activity', async ({ page }) => {
  let startTime = "08:00";
  let endTime = "08:30";

  await page.goto('https://localhost:4201/planning');
  await authenticateFullAccess(page);

  let uniqueTitle = 'Test ' + crypto.randomUUID();
  await makeActivityWithoutSaving(page, uniqueTitle, startTime, endTime);
  await page.getByRole('button', { name: 'Save changes' }).click();
  //delete afterwards to clean up. This does cause trouble if the test fails... TODO: find better solution for this
  await deleteActivity(page, uniqueTitle);
});


test('can create new activity with instructor', async ({ page }) => {
  let startTime = "09:00";
  let endTime = "09:30";

  await page.goto('https://localhost:4201/planning');
  await authenticateFullAccess(page);

  let uniqueTitle = 'Test ' + crypto.randomUUID();
  await makeActivityWithoutSaving(page, uniqueTitle, startTime, endTime);
  await page.getByRole('spinbutton').click();
  await page.getByRole('spinbutton').fill('1');
  await page.getByRole('spinbutton').press('Enter');
  await page.getByRole('textbox', { name: 'Search users...' }).click();
  await page.getByRole('textbox', { name: 'Search users...' }).pressSequentially("Full");
  await page.locator('span[user="Full Access"]').click();
  await expect(page.getByText('Full Access').nth(1)).toBeVisible();
  await page.getByRole('button', { name: 'Save changes' }).click();
  //delete afterwards to clean up. This does cause trouble if the test fails... TODO: find better solution for this
  await deleteActivity(page, uniqueTitle);
});
