# Barber Booking App

Een volledige MERN-applicatie voor het boeken van barber-afspraken.

## Features
- Gebruikers kunnen registreren en inloggen
- JWT authenticatie en beveiligde routes
- Beschikbare services bekijken: Knip, Fade, Baard
- Afspraken boeken met datum, tijd en gekozen service
- Eigen afspraken bekijken en annuleren
- Alleen eigen afspraken zijn zichtbaar

## Backend

### Installatie
```bash
cd Backend
npm install
```

### Om te starten
Maak een `.env` bestand in de `Backend` map met:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start de backend:
```bash
npm run dev
```

## Frontend

### Installatie
```bash
cd Frontend
npm install
```

### Om te starten
```bash
npm run dev
```

## Belangrijke routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/appointments`
- `POST /api/appointments`
- `DELETE /api/appointments/:id`

## Gebruikerstesten

1. Register een account via de frontend
2. Login met het account
3. Boek een afspraak via de services-pagina
4. Bekijk afspraken op de "Mijn afspraken" pagina
5. Annuleer een afspraak

## Notities

- De frontend gebruikt `react-router-dom` voor navigatie
- Backend endpoints zijn beveiligd met de `Authorization: Bearer <token>` header
