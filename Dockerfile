# Arquivo de criação da imagem (modelo do container)

# Cria a imagem a partir da imagem do node
FROM node

# Diretório de trabalho da aplicação
WORKDIR /usr/app

# Copia o arquivo package.json local para o diretório de trabalho do Docker
COPY package.json ./

# Roda a instalação das dependencias
RUN npm install

# Copia o resto dos arquivos, ignorando os que estão no .dockerignore
COPY . .

# Expõe a porta 3333 do container
EXPOSE 3333

# Roda o comando de inicialização pelo terminal
CMD ["npm", "run", "dev"]

# Build da imagem
# docker build -t rentx .

# Subir o container
# docker run -p 3333:3333 rentx
