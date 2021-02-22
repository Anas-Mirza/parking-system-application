import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class LotUpdatePage {
  pageTitle: ElementFinder = element(by.id('parkingSystemApplicationApp.lot.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#lot-name'));
  addressInput: ElementFinder = element(by.css('input#lot-address'));
  zipcodeInput: ElementFinder = element(by.css('input#lot-zipcode'));
  maxslotsInput: ElementFinder = element(by.css('input#lot-maxslots'));
  availableslotsInput: ElementFinder = element(by.css('input#lot-availableslots'));
  isopenInput: ElementFinder = element(by.css('input#lot-isopen'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setAddressInput(address) {
    await this.addressInput.sendKeys(address);
  }

  async getAddressInput() {
    return this.addressInput.getAttribute('value');
  }

  async setZipcodeInput(zipcode) {
    await this.zipcodeInput.sendKeys(zipcode);
  }

  async getZipcodeInput() {
    return this.zipcodeInput.getAttribute('value');
  }

  async setMaxslotsInput(maxslots) {
    await this.maxslotsInput.sendKeys(maxslots);
  }

  async getMaxslotsInput() {
    return this.maxslotsInput.getAttribute('value');
  }

  async setAvailableslotsInput(availableslots) {
    await this.availableslotsInput.sendKeys(availableslots);
  }

  async getAvailableslotsInput() {
    return this.availableslotsInput.getAttribute('value');
  }

  getIsopenInput() {
    return this.isopenInput;
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
    await this.setNameInput('name');
    expect(await this.getNameInput()).to.match(/name/);
    await waitUntilDisplayed(this.saveButton);
    await this.setAddressInput('address');
    expect(await this.getAddressInput()).to.match(/address/);
    await waitUntilDisplayed(this.saveButton);
    await this.setZipcodeInput('zipcode');
    expect(await this.getZipcodeInput()).to.match(/zipcode/);
    await waitUntilDisplayed(this.saveButton);
    await this.setMaxslotsInput('5');
    expect(await this.getMaxslotsInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setAvailableslotsInput('5');
    expect(await this.getAvailableslotsInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    const selectedIsopen = await this.getIsopenInput().isSelected();
    if (selectedIsopen) {
      await this.getIsopenInput().click();
      expect(await this.getIsopenInput().isSelected()).to.be.false;
    } else {
      await this.getIsopenInput().click();
      expect(await this.getIsopenInput().isSelected()).to.be.true;
    }
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
