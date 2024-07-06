import { expect, Page } from '@playwright/test'
import { htmlTable } from './tablePage.locator'
import user_details from '../data/userData.json'

const pageURL = ("https://testpages.herokuapp.com/styled/tag/dynamic-table.html");


export class Table_Page {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }


    async launchURL() {
        await this.page.goto(pageURL);
        await this.page.waitForLoadState();
    }

    async verifyDynamicTableIsVisible() {
        await expect(this.page.locator(htmlTable.dynamic_tabel)).toBeVisible();
    }

    async clickTableDataDropdown() {
        await (this.page.locator(htmlTable.table_data_dropdown)).click();
    }

    async verifyInputFieldIsVisbile() {
        await expect(this.page.locator(htmlTable.table_data_input_box)).toBeVisible();
    }

    async clearTableDataInputField() {
        await (this.page.locator(htmlTable.table_data_input_box)).clear();
    }

    // Enter User Details 
    async inputUserData(user_details) {
        const details = JSON.stringify(user_details)
        await (this.page.locator(htmlTable.table_data_input_box)).fill(details)
    }


    async clickRefreshTableButton() {
        await expect(this.page.locator(htmlTable.refresh_button)).toBeVisible();
        await (this.page.locator(htmlTable.refresh_button)).click();
    }


    async verfiyUserDetailsIsPopulated(user_details) {

        // Fetch total no of users
        const users = await (this.page.locator(htmlTable.user_detail_table_rows)).count();

        for (let i = 0; i < users - 1; i++) {

            // Check User Name
            await expect(this.page.locator(`[id='dynamictable'] tr:nth-of-type(${i + 2}) td`).nth(0)).toHaveText(user_details[i]["name"])

            // Check User Age
            await expect(this.page.locator(`[id='dynamictable'] tr:nth-of-type(${i + 2}) td`).nth(1)).toHaveText(String(user_details[i]["age"]))

            // Check User Gender
            await expect(this.page.locator(`[id='dynamictable'] tr:nth-of-type(${i + 2}) td`).nth(2)).toHaveText(user_details[i]["gender"])
        }
    }
}
