import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Person e2e test', () => {

    let navBarPage: NavBarPage;
    let personDialogPage: PersonDialogPage;
    let personComponentsPage: PersonComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load People', () => {
        navBarPage.goToEntity('person');
        personComponentsPage = new PersonComponentsPage();
        expect(personComponentsPage.getTitle())
            .toMatch(/myfamilytreeApp.person.home.title/);

    });

    it('should load create Person dialog', () => {
        personComponentsPage.clickOnCreateButton();
        personDialogPage = new PersonDialogPage();
        expect(personDialogPage.getModalTitle())
            .toMatch(/myfamilytreeApp.person.home.createOrEditLabel/);
        personDialogPage.close();
    });

    it('should create and save People', () => {
        personComponentsPage.clickOnCreateButton();
        personDialogPage.setIdNumberInput('idNumber');
        expect(personDialogPage.getIdNumberInput()).toMatch('idNumber');
        personDialogPage.setSurnameInput('surname');
        expect(personDialogPage.getSurnameInput()).toMatch('surname');
        personDialogPage.setForeNamesInput('foreNames');
        expect(personDialogPage.getForeNamesInput()).toMatch('foreNames');
        personDialogPage.sexSelectLastOption();
        personDialogPage.setPlaceOfBirthInput('placeOfBirth');
        expect(personDialogPage.getPlaceOfBirthInput()).toMatch('placeOfBirth');
        personDialogPage.setDateOfBirthInput('2000-12-31');
        expect(personDialogPage.getDateOfBirthInput()).toMatch('2000-12-31');
        personDialogPage.setPlaceOfDeathInput('placeOfDeath');
        expect(personDialogPage.getPlaceOfDeathInput()).toMatch('placeOfDeath');
        personDialogPage.setDateOfDeathInput('2000-12-31');
        expect(personDialogPage.getDateOfDeathInput()).toMatch('2000-12-31');
        personDialogPage.setBriefNoteInput('briefNote');
        expect(personDialogPage.getBriefNoteInput()).toMatch('briefNote');
        personDialogPage.setNotesInput('notes');
        expect(personDialogPage.getNotesInput()).toMatch('notes');
        personDialogPage.fatherSelectLastOption();
        personDialogPage.motherSelectLastOption();
        personDialogPage.spouseSelectLastOption();
        // personDialogPage.sourceSelectLastOption();
        personDialogPage.save();
        expect(personDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PersonComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-person div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PersonDialogPage {
    modalTitle = element(by.css('h4#myPersonLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    idNumberInput = element(by.css('input#field_idNumber'));
    surnameInput = element(by.css('input#field_surname'));
    foreNamesInput = element(by.css('input#field_foreNames'));
    sexSelect = element(by.css('select#field_sex'));
    placeOfBirthInput = element(by.css('input#field_placeOfBirth'));
    dateOfBirthInput = element(by.css('input#field_dateOfBirth'));
    placeOfDeathInput = element(by.css('input#field_placeOfDeath'));
    dateOfDeathInput = element(by.css('input#field_dateOfDeath'));
    briefNoteInput = element(by.css('input#field_briefNote'));
    notesInput = element(by.css('input#field_notes'));
    fatherSelect = element(by.css('select#field_father'));
    motherSelect = element(by.css('select#field_mother'));
    spouseSelect = element(by.css('select#field_spouse'));
    sourceSelect = element(by.css('select#field_source'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setIdNumberInput = function(idNumber) {
        this.idNumberInput.sendKeys(idNumber);
    };

    getIdNumberInput = function() {
        return this.idNumberInput.getAttribute('value');
    };

    setSurnameInput = function(surname) {
        this.surnameInput.sendKeys(surname);
    };

    getSurnameInput = function() {
        return this.surnameInput.getAttribute('value');
    };

    setForeNamesInput = function(foreNames) {
        this.foreNamesInput.sendKeys(foreNames);
    };

    getForeNamesInput = function() {
        return this.foreNamesInput.getAttribute('value');
    };

    setSexSelect = function(sex) {
        this.sexSelect.sendKeys(sex);
    };

    getSexSelect = function() {
        return this.sexSelect.element(by.css('option:checked')).getText();
    };

    sexSelectLastOption = function() {
        this.sexSelect.all(by.tagName('option')).last().click();
    };
    setPlaceOfBirthInput = function(placeOfBirth) {
        this.placeOfBirthInput.sendKeys(placeOfBirth);
    };

    getPlaceOfBirthInput = function() {
        return this.placeOfBirthInput.getAttribute('value');
    };

    setDateOfBirthInput = function(dateOfBirth) {
        this.dateOfBirthInput.sendKeys(dateOfBirth);
    };

    getDateOfBirthInput = function() {
        return this.dateOfBirthInput.getAttribute('value');
    };

    setPlaceOfDeathInput = function(placeOfDeath) {
        this.placeOfDeathInput.sendKeys(placeOfDeath);
    };

    getPlaceOfDeathInput = function() {
        return this.placeOfDeathInput.getAttribute('value');
    };

    setDateOfDeathInput = function(dateOfDeath) {
        this.dateOfDeathInput.sendKeys(dateOfDeath);
    };

    getDateOfDeathInput = function() {
        return this.dateOfDeathInput.getAttribute('value');
    };

    setBriefNoteInput = function(briefNote) {
        this.briefNoteInput.sendKeys(briefNote);
    };

    getBriefNoteInput = function() {
        return this.briefNoteInput.getAttribute('value');
    };

    setNotesInput = function(notes) {
        this.notesInput.sendKeys(notes);
    };

    getNotesInput = function() {
        return this.notesInput.getAttribute('value');
    };

    fatherSelectLastOption = function() {
        this.fatherSelect.all(by.tagName('option')).last().click();
    };

    fatherSelectOption = function(option) {
        this.fatherSelect.sendKeys(option);
    };

    getFatherSelect = function() {
        return this.fatherSelect;
    };

    getFatherSelectedOption = function() {
        return this.fatherSelect.element(by.css('option:checked')).getText();
    };

    motherSelectLastOption = function() {
        this.motherSelect.all(by.tagName('option')).last().click();
    };

    motherSelectOption = function(option) {
        this.motherSelect.sendKeys(option);
    };

    getMotherSelect = function() {
        return this.motherSelect;
    };

    getMotherSelectedOption = function() {
        return this.motherSelect.element(by.css('option:checked')).getText();
    };

    spouseSelectLastOption = function() {
        this.spouseSelect.all(by.tagName('option')).last().click();
    };

    spouseSelectOption = function(option) {
        this.spouseSelect.sendKeys(option);
    };

    getSpouseSelect = function() {
        return this.spouseSelect;
    };

    getSpouseSelectedOption = function() {
        return this.spouseSelect.element(by.css('option:checked')).getText();
    };

    sourceSelectLastOption = function() {
        this.sourceSelect.all(by.tagName('option')).last().click();
    };

    sourceSelectOption = function(option) {
        this.sourceSelect.sendKeys(option);
    };

    getSourceSelect = function() {
        return this.sourceSelect;
    };

    getSourceSelectedOption = function() {
        return this.sourceSelect.element(by.css('option:checked')).getText();
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
