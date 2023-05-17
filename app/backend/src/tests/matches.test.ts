import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Model } from 'sequelize'
import Match from '../database/models/MatchModel';
import { matches, matchesFinished, matchesInProgress } from './mocks/matches.mock';
import { Response } from 'superagent';
import { IMatch } from '../Interfaces/IMatch';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testes do endpoint /matches.', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('Deve listar todas partidas com sucesso, e retornar um status 200.', async () => {
    sinon
      .stub(Model, 'findAll')
      .resolves(matches as IMatch[]);
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches')
    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body).to.be.deep.equal(matches);
  });
  it('Deve listar partidas em andamento, e retornar um status 200.', async () => {
    sinon
      .stub(Model, 'findAll')
      .resolves(matchesInProgress as IMatch[]);
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=true')
    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body).to.be.deep.equal(matchesInProgress);
  });
  it('Deve listar partidas finalizadas, e retornar um status 200.', async () => {
    sinon
      .stub(Model, 'findAll')
      .resolves(matchesFinished as IMatch[]);
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=false')
    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body).to.be.deep.equal(matchesFinished);
  });
});
 