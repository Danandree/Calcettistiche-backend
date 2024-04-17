const { login_user } = require('../../controllers/authController');
const sinon = require('sinon');
const User = require('../../models/user');

describe('AuthController', () => {
  test('should authenticate a user with valid credentials', async () => {
    // Simuliamo una richiesta di login con credenziali valide
    const req = { body: { email: 'testuser@asd.assd', password: 'password' } };
    const res = {
      json: jest.fn(),
      status: jest.fn(() => ({ json: jest.fn() })),
    };

    // Falsificiamo la chiamata al database per restituire un utente
    const findOne = sinon.fake.resolves({ email: 'testuser@asd.assd', password: 'password' });
    sinon.replace(User, 'findOne', findOne);

    // Eseguiamo la funzione login_user in modo asincrono
    await login_user(req, res);

    // Assicuriamoci che la funzione json sia stata chiamata correttamente
    expect(res.json).toHaveBeenCalledWith({ message: 'Utente autenticato con successo' });

    // Verifichiamo che la chiamata al database sia stata effettuata correttamente
    expect(findOne).toHaveBeenCalledWith({ username: 'testuser' });

    // Rimuoviamo il mock del database
    sinon.restore();
  });
});