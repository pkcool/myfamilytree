import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Marriage e2e test', () => {

    let navBarPage: NavBarPage;
    let marriageDialogPage: MarriageDialogPage;
    let marriageComponentsPage: MarriageComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Marriages', () => {
        navBarPage.goToEntity('marriage-mft');
        marriageComponentsPage = new MarriageComponentsPage();
        expect(marriageComponentsPage.getTitle())
            .toMatch(/myfamilytreeApp.marriage.home.title/);

    });

    it('should load create Marriage dialog', () => {
        marriageComponentsPage.clickOnCreateButton();
        marriageDialogPage = new MarriageDialogPage();
        expect(marriageDialogPage.getModalTitle())
            .toMatch(/myfamilytreeApp.marriage.home.createOrEditLabel/);
        marriageDialogPage.close();
    });

    it('should create and save Marriages', () => {
        marriageComponentsPage.clickOnCreateButton();
        marriageDialogPage.setDateOfMarriageInput('2000-12-31');
        expect(marriageDialogPage.getDateOfMarriageInput()).toMatch('2000-12-31');
        marriageDialogPage.setEndOfMarriageInput('2000-12-31');
        expect(marriageDialogPage.getEndOfMarriageInput()).toMatch('2000-12-31');
        marriageDialogPage.setNotesInput('notes');
        expect(marriageDialogPage.getNotesInput()).toMatch('notes');
        marriageDialogPage.maleSelectLastOption();
        marriageDialogPage.femaleSelectLastOption();
        marriageDialogPage.save();
        expect(marriageDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class MarriageComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-marriage-mft div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class MarriageDialogPage {
    modalTitle = element(by.css('h4#myMarriageLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    dateOfMarriageInput = element(by.css('input#field_dateOfMarriage'));
    endOfMarriageInput = element(by.css('input#field_endOfMarriage'));
    notesInput = element(by.css('input#field_notes'));
    maleSelect = element(by.css('select#field_male'));
    femaleSelect = element(by.css('select#field_female'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setDateOfMarriageInput = function(dateOfMarriage) {
        this.dateOfMarriageInput.sendKeys(dateOfMarriage);
    };

    getDateOfMarriageInput = function() {
        return this.dateOfMarriageInput.getAttribute('value');
    };

    setEndOfMarriageInput = function(endOfMarriage) {
        this.endOfMarriageInput.sendKeys(endOfMarriage);
    };

    getEndOfMarriageInput = function() {
        return this.endOfMarriageInput.getAttribute('value');
    };

    setNotesInput = function(notes) {
        this.notesInput.sendKeys(notes);
    };

    getNotesInput = function() {
        return this.notesInput.getAttribute('value');
    };

    maleSelectLastOption = function() {
        this.maleSelect.all(by.tagName('option')).last().click();
    };

    maleSelectOption = function(option) {
        this.maleSelect.sendKeys(option);
    };

    getMaleSelect = function() {
        return this.maleSelect;
    };

    getMaleSelectedOption = function() {
        return this.maleSelect.element(by.css('option:checked')).getText();
    };

    femaleSelectLastOption = function() {
        this.femaleSelect.all(by.tagName('option')).last().click();
    };

    femaleSelectOption = function(option) {
        this.femaleSelect.sendKeys(option);
    };

    getFemaleSelect = function() {
        return this.femaleSelect;
    };

    getFemaleSelectedOption = function() {
        return this.femaleSelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
