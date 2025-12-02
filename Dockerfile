FROM node:20

# 1. pracovný adresár
WORKDIR /app

# 2. nainštalujeme závislosti
COPY package*.json ./
RUN npm install -g expo-cli && npm install

# 3. skopírujeme zvyšok projektu
COPY . .

# 4. Expo/Metro porty
EXPOSE 8081 19000 19001 19002

# 5. štart
CMD ["npm", "start"]