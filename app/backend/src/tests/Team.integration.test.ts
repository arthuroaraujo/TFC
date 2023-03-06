import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Team from '../database/models/Team';
import * as sinon from 'sinon';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para rota Team', () => {
  const outputMock: Team[] = [new Team({
    id: 1,
    teamName: 'Flamengo',
   })];

  afterEach(() => {
    sinon.restore();
  })

  it('Deve retornar todos os times', async () => {
    // Arrange
    sinon.stub(Team, 'findAll').resolves(outputMock);
    // Action
    const response = await chai.request(app).get('/teams');
    // Assertion
    expect(response.status).to.be.equal(200);
  });
  // it('Deve retornar um erro ao procurar os times', async () => {
  //   // Arrange
  //   sinon.stub(Team, 'findAll').resolves(outputMock);
  //   // Action
  //   const response = await chai.request(app).get('/teams');
  //   // Assertion
  //   expect(response.status).to.be.equal(500);
  //   expect(response.body).to.be.deep.equal({message: 'NOT_FOUND'});
  // });
  it('Deve retornar um time pelo id', async () => {
    // Arrange
    sinon.stub(Team, 'findOne').resolves(outputMock[0]);
    // Action
    const response = await chai.request(app).get('/teams/1');
    // Assertion
    expect(response.status).to.be.equal(200);
  });
  it('Deve retornar um erro ao procurar o time pelo id', async () => {
    // Arrange
    sinon.stub(Team, 'findOne').resolves(null);
    // Action
    const response = await chai.request(app).get('/teams/2');
    // Assertion
    expect(response.status).to.be.equal(500);
    expect(response.body).to.be.deep.equal({message: 'ID_NOT_FOUND'});
  });
});