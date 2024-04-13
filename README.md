# Calcettistiche backend
Parte backend dell'applicazione "Calcettistiche".<br>

Quest'appliczione resta in attesa delle richieste e gestisce un database per la registrazione di gioccatori, partite e statistiche varie<br>
Per la gestione dei dati l'applicazione usa MongoDB come database<br>
L'applicazione é scritta in javascript e si serve di JWT per l'autenticazione dell'utente<br>

## Richieste senza login
Questa è la lista dfelle tichieste che possono esser fatte allìapplicazione da utentei che non hanno fatto il login:
- Autenticazione:
  - POST /users/login, logga l'utente
  - POST /users/signin, crea un nuvo utente
- Utenti:
  - GET /users, restituisce la lista degli utenti registrati
  - GET /users/:id, restituisce le statistiche dell'utente selezionato
  - GET /users/:id/stats, restituisce le statistiche dell'utente selezionato
  - GET /users/:id/referee, restituisce la lista delle partite di cui l'utente è amministratore
- Partite:
  - GET /matches, restituisce la lista delle partite
  - GET /matches/:id, restituisce le statistiche della psrtita selezionata

## Richieste con login effettuato

Queste richieste sono protette con il token cookies JWT<br>
Lista delle richieste eseguibili una volta effettuato il login:
- Autenticazione:
  - POST /users/logout
- Utente:
  - GET /users/:id/private, restituisce le informazioni private dell'utente come mail
  - PUT | PATCH /users/:id, modifica l'utente
  - DELETE /users/:id, elimina l'utente
- Partite:
  - POST /matches, crea una nuova partita
  - PUT | PATCH /matches/:id, modifica la partitra selezionata
  - DELETE /matches/:id, elimina la partita selezionata

