# Steg 1: Hämta Node.js bild från Docker Hub
FROM node:18-alpine

# Steg 2: Sätt arbetskatalogen i containern
WORKDIR /app

# Steg 3: Kopiera package.json och package-lock.json för att installera beroenden
COPY package*.json ./

# Steg 4: Installera beroenden
RUN npm install

# Steg 5: Kopiera hela projektet till containern
COPY . .

# Steg 6: Bygg projektet om du använder TypeScript
RUN npm run build

# Steg 7: Exponera den port appen lyssnar på
EXPOSE 5000

# Steg 8: Kör appen när containern startar
CMD ["npm", "start"]
