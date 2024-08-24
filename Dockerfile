# Dockerfile para o Frontend

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

# Construindo a aplicação React
RUN npm run build

# Instalando o servidor web estático serve
RUN npm install -g serve

# Expondo a porta 3000
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["serve", "-s", "build"]
