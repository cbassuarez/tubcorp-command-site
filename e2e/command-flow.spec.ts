import { expect, test } from '@playwright/test'

test('primary command flow routes are reachable', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Download Companion')).toBeVisible()

  await page.goto('/surfaces')
  await expect(page.getByText('Companion Surfaces')).toBeVisible()

  await page.goto('/telemetry')
  await expect(page.getByText('Live Signal Board')).toBeVisible()

  await page.goto('/access')
  await expect(page.getByText('Access Portal')).toBeVisible()
})
