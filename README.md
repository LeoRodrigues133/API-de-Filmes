# API de Gerenciamento de Filmes 2024

O projeto **API de Gerenciamento de Filmes 2024** tem como objetivo fornecer uma API para gerenciar um catálogo de filmes, permitindo operações de CRUD (Criar, Ler, Atualizar e Deletar) para filmes e outras entidades relacionadas.

## Requisitos Funcionais

- O sistema deve permitir o cadastro de novos filmes.
- O sistema deve permitir a edição de informações dos filmes.
- O sistema deve permitir a remoção de filmes do catálogo.
- O sistema deve permitir a listagem dos filmes cadastrados.
- O sistema deve armazenar e recuperar informações sobre diretores, gêneros e atores.
- O sistema deve permitir consultas personalizadas baseadas em filtros.

## Requisitos Não Funcionais

**Persistência das Informações**
- Os dados devem ser armazenados em um banco de dados utilizando ORM (Entity Framework Core).

**Arquitetura**
- O projeto deve seguir os princípios da arquitetura em camadas.
- Deve-se utilizar boas práticas de desenvolvimento, como injeção de dependência.
- A API deve seguir o padrão RESTful.

**Segurança**
- Implementação de autenticação e autorização para acesso aos endpoints.

## Tecnologias Utilizadas

- **.NET 8.0**
- **Entity Framework Core**
- **SQL Server**
- **Swagger** para documentação da API
- **Angular** (para a interface do usuário)

## Requisitos

- .NET SDK (recomendado .NET 8.0 ou superior) para compilação e execução do projeto.
- Banco de dados SQL Server instalado ou configurado via Docker.

## Como Usar

### Clone o Repositório

```sh
git clone https://github.com/Kriegerl1/Api-Gerenciamento-de-Filmes-2024.git
```

### Navegue até a pasta raiz da solução

```sh
cd Api-Gerenciamento-de-Filmes-2024
```

### Restaure as dependências

```sh
dotnet restore
```

### Execute a migração do banco de dados

```sh
dotnet ef database update
```

### Execute o projeto

```sh
dotnet run
```

### Acesse a documentação da API
Após executar o projeto, a documentação via Swagger estará disponível em:

```
http://localhost:5000/swagger
```
