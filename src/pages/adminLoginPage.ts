import { ConfigManager } from "@config/ConfigManager";
import { PageActions } from "@helper/actions/PageActions";
import { StepRunner } from "@helper/reporting/StepRunner";
import { BasePage } from "@pages/base/BasePage";
import { ApplicationUrls } from "@support/constants/ApplicationUrls";
import { AdminLoginPageLocators } from "@support/locators/AdminLoginPageLocators";

export class AdminLoginPage extends BasePage {
  protected pageUrl = ApplicationUrls.ADMIN;
  protected pageTitle = /Restful-booker-platform demo/i;
  protected pageReadySelector = AdminLoginPageLocators.USERNAME;

  constructor(pageActions: PageActions) {
    super(pageActions);
  }

  /**
   * Verifies that the admin login form is visible and contains the expected elements.
   * @returns {Promise<void>} A promise that resolves when the verification is complete.
   */
  async verifyLoginFormVisible(): Promise<void> {
    await StepRunner.run("Admin Login - verify login form", async () => {
      await this.expectUtils.expectElementToHaveText(
        AdminLoginPageLocators.LOGIN_HEADING,
        "admin login heading",
        /login/i,
        "Admin login heading is not visible or does not contain expected text",
      );
      await this.expectUtils.expectElementToBeVisible(
        this.locator(AdminLoginPageLocators.USERNAME),
        "admin username input",
        "Admin username input is not visible",
      );
      await this.expectUtils.expectElementToBeVisible(
        AdminLoginPageLocators.PASSWORD,
        "admin password input",
        "Admin password input is not visible",
      );
      await this.expectUtils.expectElementToBeVisible(
        AdminLoginPageLocators.LOGIN_BUTTON,
        "admin login button",
        "Admin login button is not visible",
      );
    }, {
      logResult: true,
    });
  }

  /**
   * Logs in as an admin user.
   * @param {string} username - The username to log in with.
   * @param {string} password - The password to log in with.
   * @returns {Promise<void>} A promise that resolves when the login is complete.
   */
  async login(username: string, password: string): Promise<void> {
    await StepRunner.run("Admin Login - submit credentials", async () => {
      await this.ui.editBox.fill(AdminLoginPageLocators.USERNAME, username);
      await this.ui.editBox.fill(AdminLoginPageLocators.PASSWORD, password);

      await Promise.all([
        this.actions.waitForNavigation(/\/admin\/rooms/, 30_000),
        this.ui.element.click(AdminLoginPageLocators.LOGIN_BUTTON),
      ]);
    }, {
      logResult: true,
    });
  }

  /**
   * Logs in using admin credentials from the configuration.
   * @returns {Promise<void>} A promise that resolves when the login is complete.
   */
  async loginAsAdmin(): Promise<void> {
    await this.login(ConfigManager.getUsername(), ConfigManager.getPassword());
  }
}
