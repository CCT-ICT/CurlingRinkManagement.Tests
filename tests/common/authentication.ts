import { expect, Page } from "@playwright/test";
import { config } from "../../curlingrink.config";

export async function authenticateFullAccess(page: Page) {
    await page.getByRole('textbox', { name: 'Email or Username' }).fill(config.auth.fullAccessUsername);
    await page.getByRole('textbox', { name: 'Email or Username' }).click();
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill(config.auth.fullAccessPassword);
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    //Check if we are logged in with right account
    await expect(page.getByRole('button', { name: config.auth.fullAccessName })).toBeVisible();
}