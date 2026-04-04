import { expect, test } from '@playwright/test'

test('primary command flow routes are reachable', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('DOWNLOAD COMPANION')).toBeVisible()

  await page.goto('/surfaces')
  await expect(page.getByText('APP SURFACES')).toBeVisible()

  await page.goto('/telemetry')
  await expect(page.getByText('LIVE SIGNAL BOARD')).toBeVisible()

  await page.goto('/access')
  await expect(page.getByText('ENTRY RITUAL')).toBeVisible()
})
