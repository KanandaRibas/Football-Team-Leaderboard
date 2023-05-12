import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Model } from 'sequelize'
import Team from '../database/models/TeamModel';
import { teams, team2 } from './mocks/teams.mock';
import { Response } from 'superagent';

chai.use(chaiHttp);
const { expect } = chai;

describe('Endpoint "/teams" deve listar todos os times.', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Model, "findAll")
      .resolves(teams as unknown as Team[]);
  });

  afterEach(()=>{
    (Team.findAll as sinon.SinonStub).restore();
  })

  it('Lista todos times com sucesso, deve retornar um status 200', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams')
       expect(chaiHttpResponse.status).to.be.equal(200)
       expect(chaiHttpResponse.body).to.be.deep.equal(teams);
  });
});

describe('Endpoint "teams/:id" deve listar um time por "id".', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Model, "findByPk")
      .resolves(team2 as unknown as Team);
  });

  afterEach(()=>{
    (Team.findByPk as sinon.SinonStub).restore();
  })
  it('Lista um time por id, deve retornar um status 200', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams/2')
       expect(chaiHttpResponse.status).to.be.equal(200)
       expect(chaiHttpResponse.body).to.be.deep.equal(team2);
  });
});
