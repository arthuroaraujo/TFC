import { Model } from "sequelize";
import { expect } from "chai";
import * as sinon from 'sinon';
import TeamService from "../api/services/TeamService";
import Team from "../database/models/Team";

describe('Testes de serviço: Read all Teams', function() {
  afterEach(function () {
    sinon.restore();
  });
  
  it('Caso 1: Deve ler uma lista com 1 Team', async function () {
    // Arrange
    const outputMock: Team[] = [new Team({
      id: 1,
      teamName: 'Flamengo',
    })];

    // Action
    sinon.stub(Model, 'findAll').resolves(outputMock);
    const service = new TeamService();
    const result = await service.readAll();

    // Assertion
    expect(result).to.be.equal(outputMock);
    expect(result.length).to.be.equal(1);
  });
});