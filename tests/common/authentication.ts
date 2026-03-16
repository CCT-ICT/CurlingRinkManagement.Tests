import { expect, Page } from "@playwright/test";

export async function authenticateFullAccess(page: Page) {
    await page.getByRole('textbox', { name: 'Email or Username' }).fill('TestAutomationUserFullAccess');
    await page.getByRole('textbox', { name: 'Email or Username' }).click();
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('778J#FVEfu2@ytGt1O$8uu@');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    //Check if we are logged in with right account
    await expect(page.getByRole('button', { name: 'Full Access' })).toBeVisible();
}