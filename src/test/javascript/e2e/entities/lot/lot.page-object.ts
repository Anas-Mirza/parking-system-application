import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import LotUpdatePage from './lot-update.page-object';

const expect = chai.expect;
export class LotDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('parkingSystemApplicationApp.lot.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-lot'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class LotComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('lot-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('lot');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateLot() {
    await this.createButton.click();
    return new LotUpdatePage();
  }

  async deleteLot() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const lotDeleteDialog = new LotDeleteDialog();
    await waitUntilDisplayed(lotDeleteDialog.deleteModal);
    expect(await lotDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/parkingSystemApplicationApp.lot.delete.question/);
    await lotDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(lotDeleteDialog.deleteModal);

    expect(await isVisible(lotDeleteDialog.deleteModal)).to.be.false;
  }
}
