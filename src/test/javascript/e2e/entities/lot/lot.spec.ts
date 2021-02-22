import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import LotComponentsPage from './lot.page-object';
import LotUpdatePage from './lot-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('Lot e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let lotComponentsPage: LotComponentsPage;
  let lotUpdatePage: LotUpdatePage;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    lotComponentsPage = new LotComponentsPage();
    lotComponentsPage = await lotComponentsPage.goToPage(navBarPage);
  });

  it('should load Lots', async () => {
    expect(await lotComponentsPage.title.getText()).to.match(/Lots/);
    expect(await lotComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Lots', async () => {
    const beforeRecordsCount = (await isVisible(lotComponentsPage.noRecords)) ? 0 : await getRecordsCount(lotComponentsPage.table);
    lotUpdatePage = await lotComponentsPage.goToCreateLot();
    await lotUpdatePage.enterData();

    expect(await lotComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(lotComponentsPage.table);
    await waitUntilCount(lotComponentsPage.records, beforeRecordsCount + 1);
    expect(await lotComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await lotComponentsPage.deleteLot();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(lotComponentsPage.records, beforeRecordsCount);
      expect(await lotComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(lotComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
