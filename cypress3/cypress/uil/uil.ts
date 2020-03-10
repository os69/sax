export function load(url: string): Promise<void> {
    return new Promise((resolve) => {
        cy.visit(url).then(() => resolve());
    });
}

export function click(selector: string): Promise<void> {
    return new Promise((resolve) => {
        cy.get(selector).click().then(() => resolve());
    });
}

export function exists(selector: string): Promise<void> {
    return new Promise((resolve) => {
        cy.get(selector).then(() => resolve());
    });
}
