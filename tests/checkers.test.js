const { test, expect } = require('@playwright/test');

test.use({ browserName: 'chromium' });

test.describe('Checkers Game Moves', () => {
    let page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto('https://www.gamesforthebrain.com/game/checkers/');
    });

    test.afterAll(async () => {
        await page.close();
    });

    async function checkGameReady(page, expectedMessage, reloadIfNotReady = false) {
        try {
            await page.waitForSelector('#message', { timeout: 5000 });
            const message = await page.textContent('//*[@id="message"]');

            if (message === expectedMessage) {
                return true;
            } else if (reloadIfNotReady) {
                console.log('Reloading the page...');
                await page.reload();
            }
            return false;
        } catch (error) {
            console.error('Error checking game readiness:', error);
            if (reloadIfNotReady) {
                console.log('Reloading the page due to error...');
                await page.reload();
            }
            return false;
        }
    }

    async function makeMove(page, expectedMessage, fromSelector, toSelector1, toSelector2 = null) {
        if (!(await checkGameReady(page, expectedMessage, true))) {
            console.error('Game not ready for move');
            return false;
        }

        await page.click(`xpath=//img[@name="${fromSelector}"]`);
        await page.click(`xpath=//img[@name="${toSelector1}"]`);

        if (toSelector2) {  // in case another move can be used to take another Enemy's piece; not being used in this test.
            await page.waitForTimeout(1000); // Wait for 1 second
            await page.click(`xpath=//img[@name="${toSelector2}"]`);
        }

        console.log('Move completed');
        await page.waitForTimeout(2000); // Additional wait for game response
        const message = await page.textContent('#message');
        console.log('Current message:', message);

        if (message === "Please wait.") {
            await page.waitForTimeout(2000); // Additional wait if required
            console.log('Waited an additional 2 seconds.');
        }

        return true;
    }

    test('Execute game moves in sequence', async () => {
        const moves = [
            { message: "Select an orange piece to move.", from: "space02", to: "space13" },
            { message: "Make a move.", from: "space13", to: "space04" },
            { message: "Make a move.", from: "space11", to: "space02" },
            { message: "Make a move.", from: "space42", to: "space33" },
            { message: "Make a move.", from: "space51", to: "space33" },
        ];

        for (const move of moves) {
            const result = await makeMove(page, move.message, move.from, move.to);
            expect(result).toBe(true);
        }

        // Restart the game and verify
        await page.click("a[href='./']");   // click restart link
        await page.waitForTimeout(2000);
        const isGameReady = await checkGameReady(page, "Select an orange piece to move.");
        expect(isGameReady).toBe(true);
    });
});
