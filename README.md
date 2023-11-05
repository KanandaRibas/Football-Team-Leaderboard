# Boas vindas ao repositório do Football Team Leaderboard!

O Football Team Leaderboard é um site informativo sobre partidas de futebol e classificações de times em um campeonato ! ⚽️<br/>
Para este projeto foi desenvolvida uma API (utilizando o método TDD) e também foram integradas as aplicações, através do docker-compose, para que elas funcionem consumindo um banco de dados.

<details>
A modelagem dos dados foi feita através do [Sequelize](https://sequelize.org), seguindo o seguinte fluxo:
<details>
  <summary><strong>Fluxo 1: Teams (Times)</strong></summary>
 Endpoint utilizado para retornar os nomes dos times associados à partida na renderização do front-end.
</details>
<details>
  <summary><strong>Fluxo 2: Users e Login (Pessoas Usuárias e Credenciais de acesso)</strong></summary>
 Rotas criadas para validações de login e para gerar token de acesso para que a pessoa usuária possa cadastrar e atualizar partidas. 
</details>
<details>
  <summary><strong>Fluxo 3: Matches (Partidas)</strong></summary>
  Fluxo desenvolvido para que os dados apareçam corretamente na tela de partidas no front-end, sendo possível:
  
  - Filtrar somente as partidas em andamento, ou as partidas finalizadas;
  - Finalizar uma partida no banco de dados;
  - Atualizar partidas em andamento;
  - Cadastrar uma nova partida em andamento no banco de dados;
- Para que não seja cadastrada partidas inválidas, não é possível inserir uma partida com times iguais ou com um time que não existe na tabela de times.
</details>
<details>
  <summary><strong>  Fluxo 4: Leaderboards (Placares)</strong></summary>
Fluxo desenvolvido para que os dados apareçam corretamente na tabela de placar obedecendo a classificação dos times.
Através dos dados das partidas a tabela mostra os times, ordena pela classificação obtida e também mostra os pontos calculados com as seguintes propriedades por time: Total Points, Total Games, Total Victories, Total Draws, Total Losses, Goals Favor, Goals Own, Goals Balance e Efficiency. 
</details>
</details>

## Executando o projeto
1. Clone o repositório:
```bash
git clone git@github.com:KanandaRibas/Football-Team-Leaderboard.git
```

2. Entre no repositório que você acabou de clonar:
```bash
cd Football-Team-Leaderboard
```

3. Instale as dependências:
```bash
npm install && npm run install:apps
```

5. Execute o projeto com o docker-compose:
```bash
npm run compose:up
```

 Após subir a aplicação verifique se os serviços estão 'saudáveis', você pode listar os containers executando `docker ps -a`.
Os containers app_backend, app_frontend e db devem ficar sinalizados como (healthy) na coluna STATUS.<br/>
 Antes de iniciar o mysql verifique se a porta 3306 está livre, ou altere a porta na configuração do docker no arquivo `docker-compose.yml`.

6. Exiba a aplicação no seu navegador:<br/>
http://localhost:3000

- Caso queira acompanhar os logs de um serviço em tempo real pelo terminal, basta executar `npm run logs [nome_do_servico]` onde _nome_do_servico_ é opcional e pode receber os serviços _backend_, _frontend_ ou _db_.
- Para descer a aplicação do compose:<br/>
`npm run compose:down`

### Para inicializar a aplicação fora do container e conectá-la com seu banco local:
  - No diretório `app/backend/` renomeie o arquivo `.env.example` para `.env`
  - Configure os valores de acordo com o seu ambiente de desenvolvimento (credenciais de banco de dados, secrets desejadas e etc). Você pode utilizar uma ferramenta para ajudar a gerenciar o MySQL como [Workbench](https://www.mysql.com/products/workbench/).

### Configurações mínimas para execução do projeto:
  - Sistema Operacional Distribuição Unix
  - Node versão 16
  - Docker
  - Docker-compose versão >=1.29.2

### Execução de testes:
Rode o comando:
```bash
cd app/back-end && npm run test
```

## Tecnologias utilizadas:
- [Node.js](https://nodejs.org/en/about)
- [Sequelize](https://sequelize.org/)
- [MySQL](https://www.mysql.com/)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Docker](https://docs.docker.com/get-started/)
- [docker-compose](https://docs.docker.com/compose/install/)
- [Typescript](https://www.typescriptlang.org/).
- [JWT](https://jwt.io/introduction)
- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)

##
 O projeto foi desenvolvido durante o curso de desenvolvimento Web Full Stack da [Trybe](https://app.betrybe.com) e foi utilizado como avaliação para conclusão do módulo de Back-End. 
 O Front-End foi fornecido pela Trybe.



