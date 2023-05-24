# Trybe Futebol Club

## Descrição

O TFC é um projeto desenvolvido como parte do curso da Trybe, de forma a ser um site informativo sobre partidas e classificações de futebol! 

## Funcionalidades

- Realização e autenticação de usuários cadastrados por meio de login.
- Listagem de times cadastrados.
- Listagem de partidas (sejam elas finalizadas, em andamento ou ambas).
- Listagem de placares (seja considerando times mandantes, visitantes ou ambos).
- Atualização do placar das partidas em andamento;
- Finalização de partidas em andamento;

## Tecnologias utilizadas

O TFC foi desenvolvido utilizando as seguintes tecnologias:

- **Node.js**: Ambiente de execução JavaScript server-side.
- **TypeScript**: Uma linguagem de programação que adiciona recursos tipados ao JavaScript.
- **Express**: Um framework web para Node.js que simplifica o desenvolvimento de APIs.
- **MySQL**: Um sistema de gerenciamento de banco de dados relacional.
- **Sequelize**: Uma biblioteca JavaScript para interagir com bancos de dados SQL de forma simplificada.
- **Docker**: Uma plataforma que permite empacotar e distribuir aplicações em containers.
- **Mocha, Chai e Sinon**: Bibliotecas de testes utilizadas para desenvolver e executar testes automatizados.
- **JWT**: JSON Web Tokens é um padrão aberto (RFC 7519) que define um método compacto e seguro para transmitir informações entre partes como um objeto JSON. É amplamente utilizado para autenticar e autorizar solicitações em APIs.

## Instalação

Para executar o TFC localmente, certifique-se de ter o Docker e o Docker-Compose instalados em sua máquina.

1. Clone o projeto:

   ```
   git clone git@github.com:arthuroaraujo/TFC.git
   ```

2. Navegue até o diretório do projeto:

   ```
   cd TFC
   ```

3. Instale as dependências do projeto utilizando o npm ou yarn:

   ```
   npm install
   ```

   ou

   ```
   yarn install
   ```

4. Para iniciar o projeto, utilize o comando na pasta raiz do projeto:

   ```
   npm run compose:up
   ```

5. Para encerrar o projeto, utilize o comando na pasta raiz do projeto:

   ```
   npm run compose:down
   ```
   
A aplicação pode ser acessada através dos seguintes endereços:

- Front-end: http://localhost:3000
- Back-end: http://localhost:3001

