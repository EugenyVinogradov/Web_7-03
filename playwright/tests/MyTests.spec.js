const { test, expect } = require("@playwright/test");
const { user } = require("../user.js");
const { chromium } = require("playwright");


test("Positive authorization test", async ({ page }) => {
  await page.goto('https://netology.ru/');
  await page.screenshot({ path: 'Screenshots/Authorization_1.png' });
  await page.click('text=Войти');
  await expect(page).toHaveURL('https://netology.ru/?modal=sign_in');
  await page.screenshot({ path: 'Screenshots/Authorization_2.png' });
  await page.click('[placeholder="Email"]');
  await page.fill('[placeholder="Email"]', user.login);
  await page.click('[placeholder="Пароль"]');
  await page.fill('[placeholder="Пароль"]', user.password);
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://netology.ru/profile' }*/),
    page.click('[data-testid="login-submit-btn"]')
  ]);
  await expect(page).toHaveURL(
      "https://netology.ru/profile"
    ); 
  const header = page.locator("h2.src-components-pages-Profile-Programs--title--Kw5NH");
  await expect(header).toHaveText("Мои курсы и профессии");
  await page.screenshot({ path: 'Screenshots/Authorization_3.png' }); 
});

test("Negative authorization test (wrong login)", async ({ page }) => {
  await page.goto('https://netology.ru/');
  await page.screenshot({ path: 'Screenshots/WrongLogin_1.png' });
  await page.click('text=Войти');
  await expect(page).toHaveURL('https://netology.ru/?modal=sign_in');
  await page.screenshot({ path: 'Screenshots/WrongLogin_2.png' });
  await page.click('[placeholder="Email"]');
  await page.fill('[placeholder="Email"]', "login@email.com");
  await page.click('[placeholder="Пароль"]');
  await page.fill('[placeholder="Пароль"]', user.password);
  await page.click('[data-testid="login-submit-btn"]');
  const header = page.locator('[data-testid="login-error-hint"]');
  await expect(header).toHaveText("Вы ввели неправильно логин или пароль");
  await page.screenshot({ path: 'Screenshots/WrongLogin_3.png' });
});

test("Negative authorization test (wrong password)", async ({ page }) => {
  await page.goto('https://netology.ru/');
  await page.screenshot({ path: 'Screenshots/WrongPassword_1.png' });
  await page.click('text=Войти');
  await expect(page).toHaveURL('https://netology.ru/?modal=sign_in');
  await page.screenshot({ path: 'Screenshots/WrongPassword_2.png' });
  await page.click('[placeholder="Email"]');
  await page.fill('[placeholder="Email"]', user.login);
  await page.click('[placeholder="Пароль"]');
  await page.fill('[placeholder="Пароль"]', "password");
  await page.click('[data-testid="login-submit-btn"]');
  const header = page.locator('[data-testid="login-error-hint"]');
  await expect(header).toHaveText("Вы ввели неправильно логин или пароль");
  await page.screenshot({ path: 'Screenshots/WrongPassword_3.png' });
});