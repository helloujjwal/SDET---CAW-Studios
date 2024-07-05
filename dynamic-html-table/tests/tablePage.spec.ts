import { test } from '@playwright/test'
import { Page } from '@playwright/test'
import { Tabel_Page } from '../src/tablePage'
import user_details from '../data/userData.json'



let page: Page;
let tablePage: Tabel_Page;
let data

test.describe('Dynamic HTML Table Tag tests', () => {
    test.beforeEach(async ({ browser }) => {
        const context = await browser.newContext();
        context.clearCookies();
        page = await context.newPage();
        tablePage = new Tabel_Page(page);
        data = user_details["user_details"]
        await tablePage.launchURL()
    })


    test('Verify user details is populated in the UI table', async ({ }) => {
        await tablePage.verifyDynamicTableIsVisible()
        await tablePage.clickTableDataDropdown();
        await tablePage.verifyInputFieldIsVisbile();
        await tablePage.clearTableDataInputField();
        await tablePage.inputUserData(data);
        await tablePage.clickRefreshTableButton();
        await tablePage.verfiyUserDetailsIsPopulated(data);
    })


})