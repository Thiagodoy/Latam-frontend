describe('Login Test', function(){
    it('Logar',function(){
        cy.visit('http://localhost:51395');
        
        cy.get('#input-email').type('thiagodoy@hotmail.com');
        cy.get('#input-password').type('123');

        //click do botão
        cy.contains('Entrarr').click()
    })
})