import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('StaticSource e2e test', () => {

    let navBarPage: NavBarPage;
    let staticSourceDialogPage: StaticSourceDialogPage;
    let staticSourceComponentsPage: StaticSourceComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load StaticSources', () => {
        navBarPage.goToEntity('static-source');
        staticSourceComponentsPage = new StaticSourceComponentsPage();
        expect(staticSourceComponentsPage.getTitle())
            .toMatch(/myfamilytreeApp.staticSource.home.title/);

    });

    it('should load create StaticSource dialog', () => {
        staticSourceComponentsPage.clickOnCreateButton();
        staticSourceDialogPage = new StaticSourceDialogPage();
        expect(staticSourceDialogPage.getModalTitle())
            .toMatch(/myfamilytreeApp.staticSource.home.createOrEditLabel/);
        staticSourceDialogPage.close();
    });

    it('should create and save StaticSources', () => {
        staticSourceComponentsPage.clickOnCreateButton();
        staticSourceDialogPage.setSourcePathInput('sourcePath');
        expect(staticSourceDialogPage.getSourcePathInput()).toMatch('sourcePath');
        staticSourceDialogPage.setCommentInput('comment');
        expect(staticSourceDialogPage.getCommentInput()).toMatch('comment');
        staticSourceDialogPage.save();
        expect(staticSourceDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class StaticSourceComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-static-source div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class StaticSourceDialogPage {
    modalTitle = element(by.css('h4#myStaticSourceLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    sourcePathInput = element(by.css('input#field_sourcePath'));
    commentInput = element(by.css('input#field_comment'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setSourcePathInput = function(sourcePath) {
        this.sourcePathInput.sendKeys(sourcePath);
    };

    getSourcePathInput = function() {
        return this.sourcePathInput.getAttribute('value');
    };

    setCommentInput = function(comment) {
        this.commentInput.sendKeys(comment);
    };

    getCommentInput = function() {
        return this.commentInput.getAttribute('value');
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
