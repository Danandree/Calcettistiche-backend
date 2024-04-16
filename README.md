# Calcettistiche backend
Parte backend dell'applicazione "Calcettistiche".<br>

Applicazione API JSON RESTful che permette di contattare un database per creare, visualizzare e modificare le varie collezioni di utenti e partite.<br> 
Per la gestione dei dati l'applicazione usa MongoDB come database<br>
Per eseguire tutte le richieste disponibili bisogna essere loggati all'app, altrimenti si avranno un set di richieste limitate; per fare questo l'applicazione si serve di JWT per l'autenticazione dell'utente<br> 

## Installazione
Per eseguire l'applicazione sul sistema devono essere presenti:
- Node.js (e relativo package manager npm)<br>
- MongoDB<br>
- Angular CLI<br>

Scaricare l'applicazione e installare le dipendenze con "npm install".<br>
Configurare l'applicazione creando il file ".env" (vedi sotto) e lanciare il file "server.js".<br>

## Configurazione
Per configurare l'app si deve creare un file ".env" nella cartella principale nel quale inserire i parametri dell'applicazione.<br>
I parametri da cambiare sono qui elencati insieme al parametro di default in caso mancasse totalmente o parzialmente il file ".env":
 - IP_ADDRESS: localhost
 - CORS_ALLOWED_IP: localhost
 - PORT: 3000
 - DB_URI: mongodb://localhost:12017
 - JWT_TOKEN_SECRET: "TheSuperSecretJWTToken"
> [!NOTE]
> Puoi rinominare il file ".env-example" in ".env" e modificare i valori per configurare l'applicazione.

## Richieste senza login
Questa è la lista dfelle tichieste che possono esser fatte allìapplicazione da utentei che non hanno fatto il login:
- Autenticazione:
  - POST /users/login, logga l'utente
  - POST /users/signin, crea un nuvo utente
- Utenti:
  - GET /users, restituisce la lista degli utenti registrati
  - GET /users/:id/stats, restituisce le statistiche dell'utente selezionato
  - GET /users/:id/compare/:id, compara le statistiche dei due utenti selezionati
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

## Test
Le richieste al backend si possono testare all'indirizzo: [https://calcettistiche.oa.r.appspot.com](https://calcettistiche.oa.r.appspot.com)
