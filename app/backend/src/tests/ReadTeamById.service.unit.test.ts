import { Model } from "sequelize";
import { expect } from "chai";
import * as sinon from 'sinon';
import TeamService from "../api/services/TeamService";
import Team from "../database/models/Team";

describe('Testes de serviço: Read Team by Id', function() {
  afterEach(function () {
    sinon.restore();
  });
  
  it('Caso 1: Deve ler 1 Team caso Id for valido', async function () {
    // Arrange
    const inputMock: number = 1;
    const outputMock: Team = new Team({
      id: 1,
      teamName: 'Flamengo',
    });

    // Action
    sinon.stub(Model, 'findOne').resolves(outputMock);
    const service = new TeamService();
    const result = await service.readById(inputMock);

    // Assertion
    expect(result).to.be.equal(outputMock);
  });
});