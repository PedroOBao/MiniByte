# MiniByte

MiniByte é uma loja online de tecnologia desenvolvida em React com Vite, com foco em venda de produtos de hardware, periféricos, acessórios, jogos e itens relacionados ao universo digital.

A ideia do projeto é criar uma experiência semelhante a grandes lojas de tecnologia, com uma interface moderna, navegação clara e estrutura pronta para evoluir com catálogo, autenticação, administração e integração de compras.

## Visão geral

O MiniByte foi pensado como uma loja de produtos eletrônicos e gamer, com destaque para:

- Hardware e componentes de PC
- Periféricos e acessórios
- Games e itens digitais
- Produtos de tecnologia para uso pessoal e profissional
- Layout institucional com páginas de apresentação, login, cadastro e contato

## Status do projeto

O projeto está em desenvolvimento inicial, com a base do layout e a estrutura visual já criadas. A equipe já definiu as principais páginas e o roadmap do projeto com foco em entrega gradual.

### Páginas e módulos em andamento

- Home
- Login
- Cadastro
- Perfil
- Jogos
- Sobre
- Blog
- Contato
- Área administrativa

## Stack tecnológica

- React
- Vite
- React Router
- JavaScript
- CSS personalizado
- Styled Components
- Context API para gerenciamento de usuário

## Estrutura do projeto

```bash
src/
├── admin/
│   ├── Admin.jsx
│   └── AdminRoute.jsx
├── assets/
├── componentes/
│   ├── data/
│   ├── layout/
│   └── users/
├── pages/
│   ├── Home.jsx
│   ├── Sobre.jsx
│   ├── Blog.jsx
│   ├── BlogPost.jsx
│   ├── Contato.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── NotFound.jsx
├── styles/
├── App.jsx
├── Main.jsx
└── ...
```

## Funcionalidades previstas

- Landing page com destaque para produtos e categorias
- Navegação intuitiva entre páginas principais
- Página de login e cadastro
- Área de perfil do usuário
- Página dedicada a jogos e itens gamer
- Blog institucional / conteúdo de tecnologia
- Página de contato
- Estrutura administrativa para gestão futura
- Experiência visual inspirada em marketplaces de tecnologia

## Roadmap

Com base no planejamento do Jira, o projeto segue as seguintes etapas principais:

1. Definição do tema e identidade visual
2. Criação do projeto base
3. Upload para GitHub e organização do repositório
4. Desenvolvimento da Home
5. Desenvolvimento da página de Login
6. Desenvolvimento da página de Jogos
7. Desenvolvimento da página de Perfil
8. Refinamento visual e ajustes finais do projeto

## Como rodar localmente

### Pré-requisitos

- Node.js instalado
- npm ou outro gerenciador de pacotes

### Instalação

```bash
npm install
```

### Execução em modo de desenvolvimento

```bash
npm run dev
```

### Build de produção

```bash
npm run build
```

### Preview da build

```bash
npm run preview
```

## Observações

Este projeto ainda está em fase inicial de implementação, com foco na criação do visual, estrutura de páginas e base funcional da loja. A próxima etapa será complementar o fluxo de compra, autenticação, catálogo e área administrativa.
Atualmente a equipe esta utilizando um pré-modelo, que so organiza a navegação, login, seções ja pre prontas para no futuro criar as paginas reais e desenvolver as funções previstas

## Equipe

Projeto desenvolvido por alunos do grupo MiniByte, com foco em criar uma loja de tecnologia completa, moderna e funcional.

---

MiniByte — tecnologia, games e produtos digitais em um só lugar.

## Log de progresso

15/09/2026 

- Finalizada a página Home (Isaque);
- Criada a sessão de Jogos (Nicolas);
- Alteradas algumas informações do Footer (Pedro).

18/09/2026

- Início do Perfil (Guilherme Vitor)

28/09/2026

- Finalização do perfil (Guilherme Vitor);
- Criação do pipeline (Pedro);
- Refino de algumas páginas e Navbar (Isaque);
- Criação de máscaras para CPF e CEP (Isaque);


## Login, perfil e administração local

O MiniByte usa somente o navegador, sem API ou banco de dados. Após o login,
clientes e administradores vão para /perfil. O administrador vê a aba
Administração, com Produtos e Administradores; /admin redireciona para esse
perfil e exige uma conta administrativa.

Acesso inicial de demonstração: admin@email.com / admin123. A conta é criada
no primeiro login e pode alterar nome, e-mail e senha em Meus dados e Segurança.
Após alterar a senha ou o e-mail, use os dados novos: o acesso inicial deixa
de funcionar. Se havia uma sessão antiga do administrador fixo, entre novamente.

- registeredUsers: contas, credenciais locais, endereço, método de pagamento
  preferido e configurações. O CPF informado no cadastro também é preservado.
- currentUser: referência ao ID da conta autenticada. Edições do perfil são
  sincronizadas com a navbar; sessões antigas de clientes são aceitas.
- minibyte-products: catálogo de hardware, incluindo fotos, preço, estoque e
  estado publicado/inativo. Os seis produtos originais são a base inicial.
- isAdmin: deixou de autorizar acesso. O nível vem da conta da sessão.
- minibyte-cart-user-ID: carrinho individual de cada conta, vinculado ao ID.
- minibyte-cart: carrinho do visitante; preserva os itens do antigo carrinho compartilhado.

Administradores podem criar outros administradores, cadastrar e editar produtos,
enviar foto JPG/PNG/WebP (até 8 MB, reduzida antes de salvar), desativar e reativar
produtos. A publicação aparece em /produtos. Na edição, o preço se refere à
primeira variante e as demais variantes são preservadas. Estoque zero impede
novas adições pela página de produtos; não há reserva ou baixa real de estoque.

A adaptação segue a organização do perfil do Lumina Decora, mas substitui as
chamadas de API/MySQL por operações locais. O catálogo de jogos também pode ser gerenciado na área Produtos, selecionando Jogo. Pedidos e checkout continuam demonstrativos: não há pedido
persistido, pagamento processado ou e-mail enviado. Nome, e-mail, CPF, endereço e pagamento favorito do perfil preenchem o checkout automaticamente.
Campos ainda não editados no checkout acompanham as alterações salvas na conta.

Este é um protótipo: as senhas continuam armazenadas em texto no navegador, como
na implementação original. Não use senhas reais. Alterar o armazenamento pelas
ferramentas do navegador permite alterar dados e permissões; a restrição de ADM
organiza a interface e não equivale à autorização de um servidor. Os dados não
sincronizam entre dispositivos e são perdidos se o armazenamento do site for limpo.

Validação: npm test, npm run lint e npm run build.
### Cadastro de jogos

Em Perfil > Administração > Produtos, escolha **Jogo** em "O que deseja cadastrar?".
Preencha título, resumo, descrição, gêneros e plataformas (separados por vírgula),
estoque e pelo menos um formato. Digital e mídia física têm preço e plataforma/loja
próprios. A capa e os requisitos de PC são opcionais. Para requisitos, use uma linha
por componente, por exemplo "Memória: 16 GB RAM".

Os jogos ficam em minibyte-games no localStorage, com os jogos originais como base.
É possível editar, desativar e reativar tanto os originais quanto os novos.
A publicação aparece em /jogos, nos filtros, nos detalhes e nos jogos relacionados.
Editar mantém a URL do jogo. Desativar o remove dessas áreas; estoque zero bloqueia
novas adições ao carrinho. Continua sendo estoque demonstrativo, sem reserva real.
### Edição e isolamento de clientes

Nome, e-mail, senha, endereço, preferências e carrinho pertencem ao ID da conta.
Trocar o e-mail não muda esse ID. A edição salva atualiza a navbar e os dados
consumidos no checkout. O perfil e a navbar também acompanham alterações salvas
em outra aba. Rascunhos de nome/e-mail não são exibidos como dados já salvos.

A sessão continua compartilhada entre abas do mesmo navegador: entrar com outro
cliente ou sair atualiza todas elas. Os dados de cada cliente permanecem separados.
O carrinho de visitante não é transferido automaticamente para a conta no login.

Verificação no Chrome: após npm run build, execute node tests/customer-browser.mjs
a partir de MiniByte. O teste usa contas fictícias e perfil de navegador temporário,
sem abrir o perfil pessoal do Chrome. No Windows, o caminho padrão é
C:/Program Files/Google/Chrome/Application/chrome.exe; ajuste CHROME_BIN se necessário.
