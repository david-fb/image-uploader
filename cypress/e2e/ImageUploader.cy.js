describe('Visit page from a non-authenticated user', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000/');
  });

  before(() => {
    indexedDB.deleteDatabase('firebaseLocalStorageDb');
  });

  it('redirect to the login page', () => {
    cy.wait(500);
    cy.url().should('eq', 'http://localhost:9000/login');
  });

  it('contain login form', () => {
    cy.contains('Iniciar Sesión').click();
    cy.get('input[name="email"]');
    cy.get('input[name="password"]');
    cy.contains('Entrar');
  });

  it('contain sign up form', () => {
    cy.contains('Registro').click();
    cy.wait(500);
    cy.contains('Nombre');
    cy.get('input[name="email"]');
    cy.get('input[name="password"]');
    cy.contains('Registrarse');
  });
});

describe('When logged in', () => {
  before(() => {
    indexedDB.deleteDatabase('firebaseLocalStorageDb');
  });
  beforeEach(() => {
    cy.visit('http://localhost:9000/');
  });

  it('login with  email and password', () => {
    cy.get('input[name="email"]').type('test@test.com');
    cy.get('input[name="password"]').type('123456');
    cy.contains('Entrar').click();
    cy.url().should('eq', 'http://localhost:9000/');
  });

  it('show index page', () => {
    cy.url().should('eq', 'http://localhost:9000/');
    cy.contains('Subir Imagen');
    cy.contains('Galería');
  });

  it('pick image and upload', () => {
    cy.get('input[type=file').selectFile('cypress/fixtures/test.jpg');
    cy.contains('test.jpg');
    cy.get('#upload-image-button').click();
    cy.wait(1000);
    cy.contains('Imagen subida');
    cy.get('.image__grid').children().should('have.length', 1);
  });

  it('delete image', () => {
    cy.get('.image__grid').get('.item__buttons').children().last().click();
    cy.contains('OK').click();
    cy.contains('Imagen Eliminada');
  });

  it('Sign out', () => {
    cy.contains('Cerrar Sesión').click();
    cy.url().should('eq', 'http://localhost:9000/login');
  });
});
