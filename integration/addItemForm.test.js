describe('addItemForm', () => {
   it('addItemForm default, visually looks correct', async () => {
      // APIs from jest-puppeteer
      await page.goto('http://localhost:6006/iframe.html?args=&id=todolists-additemform--add-item-form-story&viewMode=story',
         {waitUntil: 'networkidle2'})
      await page.waitForTimeout(2000)
      const image = await page.screenshot()

      // API from jest-image-snapshot
      expect(image).toMatchImageSnapshot()
   })
   it('addItemForm with error, visually looks correct', async () => {
      // APIs from jest-puppeteer
      await page.goto('http://localhost:6006/iframe.html?args=&id=todolists-additemform--add-item-form-error-story&viewMode=story',
         {waitUntil: 'networkidle2'})
      await page.waitForTimeout(2000)
      const image = await page.screenshot()

      // API from jest-image-snapshot
      expect(image).toMatchImageSnapshot()
   })
})