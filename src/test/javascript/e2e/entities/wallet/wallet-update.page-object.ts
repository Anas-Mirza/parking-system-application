import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class WalletUpdatePage {
  pageTitle: ElementFinder = element(by.id('parkingSystemApplicationApp.wallet.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  moneyInput: ElementFinder = element(by.css('input#wallet-money'));
  userSelect: ElementFinder = element(by.css('select#wallet-user'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setMoneyInput(money) {
    await this.moneyInput.sendKeys(money);
  }

  async getMoneyInput() {
    return this.moneyInput.getAttribute('value');
  }

  async userSelectLastOption() {
    await this.userSelect.all(by.tagName('option')).last().click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setMoneyInput('5');
    expect(await this.getMoneyInput()).to.eq('5');
    await this.userSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
