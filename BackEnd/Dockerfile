# Dockerfile para o Backend

# Usando uma imagem base do Node.js
FROM node:18-alpine

# Definindo o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiando os arquivos package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instalando as dependências
RUN npm install

# Copiando todo o restante do código fonte para o contêiner
COPY . .

# Compilando o código TypeScript para JavaScript
RUN npm run build

# Expondo a porta 3000
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:prod"]
