# Produtos

Este é um projeto de uma API RESTful para gerenciamento de produtos. O projeto foi desenvolvido em TypeScript e utiliza o framework Express.js.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado os seguintes itens na sua máquina:

- **Node.js** (versão 16 ou superior) - [Link para download](https://nodejs.org/)
- **pnpm** (gerenciador de pacotes) - [Guia de instalação](https://pnpm.io/pt/installation)
- **Docker** (para executar serviços de banco de dados, entre outros) - [Guia de instalação](https://docs.docker.com/get-docker/)
- **Docker Compose** (para gerenciar os containers do Docker) - [Guia de instalação](https://docs.docker.com/compose/install/)
- **Git** (para clonar o repositório, se necessário) - [Guia de instalação](https://git-scm.com/)

---

## Como executar

Siga os passos abaixo para configurar e executar o projeto:

### 1. Clone o repositório (se necessário)

Caso ainda não tenha clonado o repositório, execute:

```bash
git clone https://github.com/leonardototti/products-backend.git
cd products-backend
```

### 2. Instale as dependências

Com o pnpm já instalado, execute o seguinte comando na raiz do projeto para instalar todas as dependências:

```bash
pnpm i
```

### 3. Configuração das variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base no arquivo de exemplo `.env.example`:

```env
# Porta onde o back-end será executado
APP_PORT=3001

# Configurações do banco de dados PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USER=
DB_PASSWORD=
DB_NAME=

# Diretório para salvar os arquivos localmente
DISK_PATH=tmp
```

### 4. Subindo os serviços Docker

Para iniciar o banco de dados e outros serviços necessários (definidos no arquivo docker-compose.yml), execute:

```bash
docker-compose up -d
```

Isso irá subir um container com o PostgreSQL na porta configurada no arquivo `.env`.

### 5. Executando o servidor de desenvolvimento

O servidor será iniciado na porta configurada no .env (por padrão, http://localhost:3001).

```bash
pnpm dev
```
