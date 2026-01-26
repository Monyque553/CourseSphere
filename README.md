#CourseSphere — Instruções de Execução

Este projeto foi desenvolvido como parte de um processo seletivo de estágio e consiste em uma aplicação web para gerenciamento de cursos.

##Tecnologias Utilizadas

-Frontend: React
-Backend: FastAPI
-Banco de Dados: MongoDB (local)

##Pré-requisitos

-Antes de iniciar, certifique-se de que possui as seguintes ferramentas instaladas:
-Python 
-Node.js 
-npm
-MongoDB em execução (localhost:27017)

##Backend — FastAPI
1. Acessar o diretório do backend
cd backend
2. Ativar o ambiente virtual
source venv/bin/activate
Caso o ambiente virtual ainda não exista, crie-o com:
python -m venv venv
4. Iniciar o servidor
uvicorn main:app --reload
5. Acessar a documentação da API
http://127.0.0.1:8000/docs
6. Cadastro de usuários
Utilize a rota auth/login.
No campo role, utilize:
"I" para instrutor
"C" para criador de curso

##Frontend — React
1. Acessar o diretório do frontend
cd frontend
2. Instalar as dependências
npm install
3. Iniciar a aplicação
npm run dev


A aplicação estará disponível no endereço exibido no terminal.



