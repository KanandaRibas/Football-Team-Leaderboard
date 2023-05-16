import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Model } from 'sequelize'
import { Response } from 'superagent';
import UserModel from '../database/models/UserModel';
import { user, invalidEmail, invalidPassword, withoutPassword, notFoundUser } from './mocks/login.mock';

chai.use(chaiHttp);
const { expect } = chai;

describe('Teste do endpoint /login.', () => {
  let chaiHttpResponse: Response;
  let token: string;

  beforeEach(async () => {
    sinon
      .stub(Model, "findOne")
      .resolves(user as unknown as UserModel);
  });

  afterEach(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
  })

  it('Deve fazer login com sucesso, e retornar um token', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: "user@user.com",
        password: "secret_user",
      })
    token = chaiHttpResponse.body.token;
    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body.token).to.be.equal(token);
  });
  it('Tentativa de login com campos vazios, deve retornar um status 400.', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
    expect(chaiHttpResponse.status).to.be.equal(400)
    expect(chaiHttpResponse.body).to.be.deep.equal({message: 'All fields must be filled'});
  });
  it('Tentativa de login sem senha, deve retornar um status 400.', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(withoutPassword)
    expect(chaiHttpResponse.status).to.be.equal(400)
    expect(chaiHttpResponse.body).to.be.deep.equal({message: 'All fields must be filled'});
  });
  it('Tentativa de login com email inválido, deve retornar um status 401.', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(invalidEmail)
    expect(chaiHttpResponse.status).to.be.equal(401)
    expect(chaiHttpResponse.body).to.be.deep.equal({message: 'Invalid email or password'});
  });
  it('Tentativa de login com senha inválida, deve retornar um status 401.', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(invalidPassword)
    expect(chaiHttpResponse.status).to.be.equal(401)
    expect(chaiHttpResponse.body).to.be.deep.equal({message: 'Invalid email or password'});
  });
});
describe('Teste de tentativa de login com usuário não cadastrado', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Model, "findOne")
      .resolves(null);
  });

  afterEach(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
  })
  it('Usuário inválido, deve retornar um status 401.', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(notFoundUser)
    expect(chaiHttpResponse.status).to.be.equal(401)
    expect(chaiHttpResponse.body).to.be.deep.equal({message: 'Invalid email or password'});
  });
});
describe('Teste do endopoint /login/role', () => {
  let chaiHttpResponse: Response;
  let token: string;

  beforeEach(async () => {
    sinon
      .stub(Model, "findOne")
      .resolves(user as unknown as UserModel);
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: "user@user.com",
        password: "secret_user",
      });

    token = chaiHttpResponse.body.token;
  });

  afterEach(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
  })

  it('Deve retornar a propriedade role e um status 200.', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/role')
      .set('Authorization', token);
    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body).to.be.deep.equal({role: 'user'});
  });
});