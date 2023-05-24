describe('task', () => {
   it('task is not done, visually looks correct', async () => {
      // APIs from jest-puppeteer
      await page.goto('http://localhost:6006/iframe.html?args=&id=todolists-task--task-is-not-done&viewMode=story',
         {waitUntil: 'networkidle2'})
      await page.waitForTimeout(2000)
      const image = await page.screenshot()

      // API from jest-image-snapshot
      expect(image).toMatchImageSnapshot()
   })
   it('task is done, visually looks correct', async () => {
      // APIs from jest-puppeteer
      await page.goto('http://localhost:6006/iframe.html?args=&id=todolists-task--task-is-done&viewMode=story',
         {waitUntil: 'networkidle2'})
      await page.waitForTimeout(2000)
      const image = await page.screenshot()

      // API from jest-image-snapshot
      expect(image).toMatchImageSnapshot()
   })
})