# 📱 Pizzaria Oliveira - App Mobile

Este repositório contém o **aplicativo mobile** da Pizzaria Oliveira, desenvolvido com **React Native + Expo** e **TypeScript**. O app permite que clientes realizem pedidos diretamente pelo celular, visualizem o cardápio e acompanhem o status dos pedidos em tempo real.

## 🚀 Tecnologias Utilizadas

- **React Native**
- **Expo**
- **TypeScript**
- **Axios**
- **React Navigation**
- **AsyncStorage**
- **JWT (via headers)**
- **Context API**

## 🎯 Funcionalidades

- Autenticação de usuário (login)
- Visualização de categorias e produtos
- Adição de produtos ao pedido
- Remoção de itens do pedido
- Finalização do pedido
- Visualização de pedidos em andamento
- Logout e persistência de sessão

## 📁 Estrutura do Projeto

```text
src/
├── components/         # Componentes reutilizáveis (botões, inputs, etc.)
├── context/            # Contexto de autenticação
├── pages/              # Telas do aplicativo (Home, Login, etc.)
├── routes/             # Configuração de navegação
├── services/           # Configuração do Axios e chamadas à API
├── utils/              # Funções auxiliares
```

## 🔐 Autenticação

A autenticação é feita via **JWT**, armazenado localmente com **AsyncStorage**. O token é enviado nos headers das requisições para rotas protegidas da API.

## ▶️ Como Rodar o Projeto

```bash
# Instale as dependências
npm install

# Inicie o projeto com Expo
npx expo start
```

> 💡 Certifique-se de configurar a URL da API no arquivo: `/src/services/api.ts`

## 📦 Backend da Aplicação

Este app se conecta à mesma API utilizada pelo painel web:  
👉 [Pizzaria API](https://github.com/seu-usuario/pizzaria-api)

## 📸 Imagens da Interface

Em breve...

## 🧑‍💻 Autor

Feito com 💛 por [@renelps](https://github.com/renelps)

## 📄 Licença

Este projeto está sob a licença MIT.
