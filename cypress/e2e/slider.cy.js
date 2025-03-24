describe('Swiper Gallery Test', function () {
  it('Checks if second slide contains "United Kingdom"', function () {
    cy.visit('http://localhost:3000');
    cy.get('.swiper-button-next').click();
    cy.get('.swiper-slide-active').should('contain', 'United Kingdom');
  });
});

describe('Swiper Gallery Test', function () {
  it('Checks if third slide contains "Paris"', function () {
    cy.visit('http://localhost:3000');
    cy.get('.swiper-button-next').click();
    cy.wait(2000);
    cy.get('.swiper-button-next').click({ force: true });
    cy.wait(2000);
    cy.get('.swiper-slide-active').should('contain', 'Paris');
  });
});

describe('Swiper Navigation Test', function () {
  it('Ensures the user can navigate slides using next and prev buttons', function () {
    cy.visit('http://localhost:3000');
    cy.get('.swiper-slide-active').invoke('text').then((firstSlideText) => {
      cy.get('.swiper-button-next').click();
      cy.wait(1000); 
      cy.get('.swiper-slide-active').invoke('text').then((nextSlideText) => {
        expect(nextSlideText).not.to.eq(firstSlideText);
        cy.get('.swiper-button-prev').click();
        cy.wait(1000);
        cy.get('.swiper-slide-active').invoke('text').should('eq', firstSlideText);
      });
    });
  });
});

describe('Swiper Slide Content Test', function () {
  it('Verifies that each slide displays the correct title and description', function () {
    cy.visit('http://localhost:3000');
    const slides = [
      { title: 'Rome', description: 'Italy' },
      { title: 'London', description: 'United Kingdom' },
      { title: 'Paris', description: 'France' }
    ];
    slides.forEach((slide, index) => {
      if (index > 0) {
        cy.get('.swiper-button-next').click();
        cy.wait(1000);
      }
      cy.get('.swiper-slide-active').should('contain', slide.title);
      cy.get('.swiper-slide-active').should('contain', slide.description);
    });
  });
});

describe('Gallery on different devices', () => {
  const devices = [
    { name: 'Desktop', width: 1280, height: 800 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Phone', width: 375, height: 667 },
  ];

  devices.forEach((device) => {
    it(`should work correctly on ${device.name}`, () => {
      cy.viewport(device.width, device.height);
      cy.visit('http://localhost:3000');
      cy.get('.swiper').should('be.visible');
      cy.get('.swiper-wrapper').should('have.css', 'display', 'flex');
      cy.get('.swiper-slide').should('be.visible');
      cy.get('.swiper-button-next').should('be.visible').and('not.be.disabled').click();
      cy.get('.swiper-button-prev').should('be.visible').and('not.be.disabled').click();
      cy.get('.swiper-slide-active').should('be.visible');
      cy.get('.swiper-slide-active').should('have.class', 'swiper-slide-visible');
      cy.get('.swiper-slide-active').find('.card-description').should('be.visible');
    });
  });
});

describe('Swiper Gallery Visibility Test', function () {
  it('Checks if the gallery is displayed correctly', function () {
    // Krok 1: Otwórz stronę z galerią
    cy.visit('http://localhost:3000');

    // Krok 2: Sprawdź, czy główny kontener galerii jest widoczny
    cy.get('.swiper').should('be.visible');

    // Krok 3: Sprawdź, czy trzy slajdy w galerii są widoczne
    cy.get('.swiper-slide').should('have.length', 3);

    // Krok 4: Sprawdź, czy przyciski nawigacji są obecne i klikalne
    cy.get('.swiper-button-next').should('be.visible').and('not.be.disabled');
    cy.get('.swiper-button-prev').should('be.visible').and('not.be.disabled');

    // Dodatkowo sprawdzamy, czy przejście do następnego slajdu działa
    cy.get('.swiper-button-next').click();
    cy.wait(1000); // Poczekaj chwilę na zakończenie animacji
    cy.get('.swiper').should('be.visible');

    // Sprawdzenie, czy przycisk poprzedni działa
    cy.get('.swiper-button-prev').click();
    cy.get('.swiper-slide-active').should('be.visible');
  });
});
