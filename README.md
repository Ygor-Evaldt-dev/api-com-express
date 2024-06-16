# API REST - Lista de tarefas

## Apresentação
Esta é uma API REST de lista de tarefas com autenticação de usuário. <br>
Construída para servir aplicações web onde um usuário pode descrever e salvar as tarefas que deseja realizar e sinalizar as tarefas que já concluiu.

### Tecnologias utilizadas
- Nodejs
- TypeScript
- Express
- Prisma
- Jest
- Axios
- JSON Web Token
- Uuid
- Bcrypt
- Cors

## Instalação

### Pré requisítos
- Nodejs v18.20.3 ou superior
- ts-node-dev globalmente instalado
- Docker v26.1.4 ou superior
- Docker Compose v2.27.0 ou superior
- Git v2.39.2 ou superior

### Clonagem do repositório
- HTTPS
    ```bash
    https://github.com/Ygor-Evaldt-dev/api-com-express.git
    ```
- SSH
    ```bash
    git@github.com:Ygor-Evaldt-dev/api-com-express.git
    ```
Também é possível baixar o arquivo .zip do projeto clicando no botão '<> Code' acima da listagem de arquivos do projeto e selecionando a opção 'Download ZIP'

### Executando projeto localmente
Em seu computador, abra o diretório do projeto no terminal e execute o seguinte comando para baixar as dependências.
```bash
npm install
```

Após baixar as dependências, você deve ser capaz de executar o projeto localmente executando o comando abaixo.
```bash
npm run dev
```
Este comando irá executar um script do arquivo package.json que está configurado para executar um servidor de desenvolvimento local utilizando o ts-node-dev. <br>
Ao executar 'npm run dev' também será realizado a criação de um container docker com as imagens do postgres e do pgAdmin para trabalhar com o banco de dados da aplicação.

### Conferindo se tudo deu certo
- Acesse [http://localhost:3000/user/login](http://localhost:3000/user/login) para criar um cadastro na aplicação.
- Acesse [http://localhost:8081](http://localhost:8081) para acessar o pgAdmin com as credenciais definidas no arquivo '.env.development'

## Como utilizar

### Endpoints disponíveis
- Usuário
    - Salvar - POST 
        ```bash
        /user/save
        ```
        ```json
        // body
        {
            "name": "name",
            "email": "email",
            "password": "pass",
            "phone": "dddphone"
        }
        ```
    - Logar - POST 
        ```bash
        /user/login
        ```
        ```json
        // body
        {
            "email": "validemail@email.com",
            "password": "validpassword"
        }
        ```
    - Excluir - DELETE
        - Necessário estar autênticado
        ```bash
        /user/delete
        ```
        ```json
        // body
        {
            "email": "validemail@email.com"
        }
        ```
- Tarefa: Necessário estar autênticado
    - Salvar - POST 
        ```bash
        /task/save
        ```
        ```json
        // body
        {
            "name": "name",
            "email": "email", //obrigatório
            "password": "pass", //obrigatório
            "phone": "dddphonenumber"
        }
        ```
    - Buscar - GET 
        ```bash
        /task/find/:id
        ```
        - id: id da tarefa
    - Buscar muitos - GET 
        ```bash
        /task/findMany/:userId/:page/:take
        ```
        - userId: Id do usuário que cadastrou a tarefa
        - page: Página com registros, inicia em 0
        - take: Quantidade de registros por página
    - Filtrar - GET 
        ```bash
        /task/filter/:userId/:page/:take
        ```
        - userId: Id do usuário que cadastrou a tarefa
        - page: Página com registros, inicia em 0
        - take: Quantidade de registros por página
        - Parâmetros de query:
            - id: opcional
                - Id da tarefa
            - title: opcional
                - Título da tarefa, podendo ser apenas o valor parcial
            - finished: opcional
                - Status da tarefa, podendo ser 'true' ou 'false'
    - Excluir - DELETE
        ```bash
        /task/delete/:id
        ```
        - id: Id da tarefa