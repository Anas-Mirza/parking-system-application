import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class BookingUpdatePage {
  pageTitle: ElementFinder = element(by.id('parkingSystemApplicationApp.booking.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  vehiclenoInput: ElementFinder = element(by.css('input#booking-vehicleno'));
  entrytimeInput: ElementFinder = element(by.css('input#booking-entrytime'));
  exittimeInput: ElementFinder = element(by.css('input#booking-exittime'));
  userSelect: ElementFinder = element(by.css('select#booking-user'));
  lotSelect: ElementFinder = element(by.css('select#booking-lot'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setVehiclenoInput(vehicleno) {
    await this.vehiclenoInput.sendKeys(vehicleno);
  }

  async getVehiclenoInput() {
    return this.vehiclenoInput.getAttribute('value');
  }

  async setEntrytimeInput(entrytime) {
    await this.entrytimeInput.sendKeys(entrytime);
  }

  async getEntrytimeInput() {
    return this.entrytimeInput.getAttribute('value');
  }

  async setExittimeInput(exittime) {
    await this.exittimeInput.sendKeys(exittime);
  }

  async getExittimeInput() {
    return this.exittimeInput.getAttribute('value');
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

  async lotSelectLastOption() {
    await this.lotSelect.all(by.tagName('option')).last().click();
  }

  async lotSelectOption(option) {
    await this.lotSelect.sendKeys(option);
  }

  getLotSelect() {
    return this.lotSelect;
  }

  async getLotSelectedOption() {
    return this.lotSelect.element(by.css('option:checked')).getText();
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
    await this.setVehiclenoInput('vehicleno');
    expect(await this.getVehiclenoInput()).to.match(/vehicleno/);
    await waitUntilDisplayed(this.saveButton);
    await this.setEntrytimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getEntrytimeInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.setExittimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getExittimeInput()).to.contain('2001-01-01T02:30');
    await this.userSelectLastOption();
    await this.lotSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
