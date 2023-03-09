import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Match from '../database/models/Match';
import * as sinon from 'sinon';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes para rota Match', () => {

  const affectedCount: number = 1;

  const inputMockPatch = {
    "homeTeamGoals": 3,
    "awayTeamGoals": 1
  };

  const inputMockPost = {
    "homeTeamId": 4, 
    "awayTeamId": 9,
    "homeTeamGoals": 2,
    "awayTeamGoals": 1
  };

  const outputMockInProgress: Match[] = [new Match({
    "id": 41,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Internacional"
    }
  })];

  const outputMockFinished: Match[] = [new Match ({
    "id": 41,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 9,
    "awayTeamGoals": 0,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Internacional"
    }
  })];

  const outputMockPost = {
    "id": 49,
    "homeTeamId": 4,
    "awayTeamId": 9,
    "homeTeamGoals": 2,
    "awayTeamGoals": 1,
    "inProgress": true
  };

  const token = 'eyJhbGciOiJIUzI1NiJ9.YWRtaW5AYWRtaW4uY29t.s1U6I8B6x_9eLeJyb9PdjTz1JbNXo57xor-T1493RW0'

  afterEach(() => {
    sinon.restore();
  })

  it('Deve retornar todas as partidas', async () => {
    // Arrange
    sinon.stub(Match, 'findAll').resolves(outputMockInProgress);
    // Action
    const response = await chai.request(app).get('/matches');
    // Assertion
    expect(response.status).to.be.equal(200);
  });
  it('Deve retornar todas as partidas em progresso', async () => {
    // Arrange
    sinon.stub(Match, 'findAll').resolves(outputMockInProgress);
    // Action
    const response = await chai.request(app).get('/matches?inProgress=true');
    // Assertion
    expect(response.status).to.be.equal(200);
  });
  it('Deve retornar a mensagem finished', async () => {
    // Arrange
    sinon.stub(Match, 'update').resolves([affectedCount]);
    // Action
    const response = await chai.request(app).patch('/matches/1/finish').set('authorization', token)
    // Assertion
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({message: "Finished"});
  });
  it('Deve retornar a mensagem updated', async () => {
    // Arrange
    sinon.stub(Match, 'update').resolves([affectedCount]);
    // Action
    const response = await chai.request(app).patch('/matches/1').send(inputMockPatch).set('authorization', token)
    // Assertion
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({message: "Updated"});
  });
//   it('Deve retornar a mensagem a partida criada', async () => {
//     // Arrange
//     sinon.stub(Match, 'create').resolves(outputMockFinished);
//     // Action
//     const response = await chai.request(app).post('/matches').send(inputMockPost).set('authorization', token)
//     // Assertion
//     expect(response.status).to.be.equal(201);
//     expect(response.body).to.be.deep.equal(outputMockPost);
//   });
});