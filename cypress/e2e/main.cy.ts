describe("Main Component", () => {
  beforeEach(() => {
    // Optional: Perform any setup or visit the component URL if needed
  });

  it("renders the component and performs search", () => {
    cy.visit("http://localhost:3000");

    // Click the next page button
    // wait up to 30 seconds for api answer if loaded
    cy.get("#main-pagination-buttons button:last-child", {
      timeout: 30000,
    }).click();

    // Assert the page number has updated
    cy.get("#main-pagintaion-page").should("contain", "Page: 2");

    // Interact with the search input
    cy.get("#main-search-input")
      .should("be.visible")
      .type("Luke Skywalker")
      .should("have.value", "Luke Skywalker");

    // Wait for the results to be rendered
    cy.wait(500); // Adjust the wait time as per the actual delay in your code

    // Perform assertions on the rendered cards
    cy.get("#card-0").should("contain", "Luke Skywalker");
  });
});
