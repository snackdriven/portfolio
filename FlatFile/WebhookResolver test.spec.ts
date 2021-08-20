import {
  LicenseEntity,
  TeamEntity,
  UserEntity,
  WebhookEventEntity,
} from '@flatfile/api/entities'
import { createMock, CustomMock } from '@flatfile/api/test-utils/createMock'
import {
  createMockEntity,
  MockEntity,
} from '@flatfile/api/test-utils/createMockEntity'
import { createProviderMocks } from '@flatfile/api/test-utils/createProviderMocks'
import { createRepositoryMocks } from '@flatfile/api/test-utils/createRepositoryMocks'
import { getMockFromTestingModule } from '@flatfile/api/test-utils/getMockFromTestingModule'
import { WebhookEventResponse } from '@flatfile/api/types/responses/WebhookEventResponse'
import { uuid } from '@flatfile/api/utils/uuid'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { UserInputError } from 'apollo-server-errors'
import { Repository, SelectQueryBuilder } from 'typeorm'

import { IdentityService } from '../IdentityModule/IdentityService'
import { PaginationService } from '../PaginationModule/PaginationService'
import { TeamService } from '../TeamModule/TeamService'

import { WebhookResolver } from './WebhookResolver'

// eslint-disable-next-line @typescript-eslint/no-empty-function
jest.mock('sqreen', () => {})

describe('WebhookResolver', () => {
  let resolver: WebhookResolver
  let testingModule: TestingModule
  let idService: IdentityService
  let paginationService: PaginationService
  let teamService: TeamService

  let webhookRepository: CustomMock<Repository<WebhookEventEntity>>
  let mockWebhook: (value?: any, isNew?: boolean) => MockEntity | undefined

  let teamRepository: CustomMock<Repository<TeamEntity>>
  let mockTeam: (value?: any, isNew?: boolean) => MockEntity | undefined

  let mockLicense: (value?: any, isNew?: boolean) => MockEntity | undefined
  let licenseRepository: CustomMock<Repository<LicenseEntity>>

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        ...createRepositoryMocks(WebhookEventEntity),
        ...createProviderMocks(IdentityService, PaginationService, TeamService),
        WebhookResolver,
      ],
    }).compile()

    webhookRepository = getMockFromTestingModule<
      string,
      Repository<WebhookEventEntity>
    >(testingModule, getRepositoryToken(WebhookEventEntity))
    mockWebhook = createMockEntity(webhookRepository, WebhookEventEntity)

    teamService = testingModule.get<TeamService>(TeamService)
    teamRepository = createMock(Repository)
    mockTeam = createMockEntity(teamRepository, TeamEntity)

    licenseRepository = createMock(Repository)
    mockLicense = createMockEntity(licenseRepository, LicenseEntity)

    paginationService = testingModule.get<PaginationService>(PaginationService)
    idService = testingModule.get<IdentityService>(IdentityService)
    resolver = testingModule.get<WebhookResolver>(WebhookResolver)
  })

  const mockQueryBuilder = <T>(
    repository: CustomMock<Repository<T>>,
    result: T | T[]
  ) => {
    const selectQueryBuilderMock = createMock(SelectQueryBuilder)
    selectQueryBuilderMock.where.mockImplementation(() => result)
    // @ts-ignore
    repository.createQueryBuilder.mockImplementation(
      () => selectQueryBuilderMock
    )
    return { selectQueryBuilderMock }
  }

  describe('getWebhookEvents', () => {
    let webhookResponse: WebhookEventResponse
    let webhookEventEntity: WebhookEventEntity[]

    const user = new UserEntity()

    beforeEach(async () => {
      webhookEventEntity = [mockWebhook()] as WebhookEventEntity[]
      webhookResponse = {
        pagination: {
          totalCount: 1,
          onPage: 1,
          pageCount: 1,
          currentPage: 1,
          offset: 0,
          limit: 10,
        },
        data: webhookEventEntity,
      }
    })
    it('throws error if licenseKey is not UUID', async () => {
      const licenseKey = { licenseKey: 'very invalid key' }
      idService.isUUID = jest.fn().mockImplementationOnce(() => false)
      await expect(
        resolver.getWebhookEvents(user, licenseKey, {})
      ).rejects.toThrowError(
        new UserInputError('License key is invalid.', {
          invalidArgs: ['licenseKey'],
        })
      )
      expect(idService.isUUID).toHaveBeenCalled()
    })
    it('throws error if license key is not found', async () => {
      const licenseKey = uuid()
      idService.isUUID = jest.fn(() => true)
      idService.getBestLicenseKey = jest.fn().mockResolvedValueOnce(undefined)
      await expect(
        resolver.getWebhookEvents(user, licenseKey, {})
      ).rejects.toThrowError(
        new UserInputError('License key is invalid.', {
          invalidArgs: ['licenseKey'],
        })
      )
      expect(idService.isUUID).toHaveBeenCalled()
      expect(idService.getBestLicenseKey).toHaveBeenCalled()
    })
    it('fails if team not found for user', async () => {
      const licenseKey = uuid()
      const licenseMock = mockLicense({ user, licenseKey })
      idService.isUUID = jest.fn(() => true)
      idService.getBestLicenseKey = jest.fn().mockResolvedValueOnce(licenseMock)
      teamService.findTeamForUserOrFail = jest.fn().mockResolvedValueOnce(false)
      await expect(
        resolver.getWebhookEvents(user, licenseKey, {})
      ).rejects.toThrow()
      expect(idService.isUUID).toHaveBeenCalled()
      expect(idService.getBestLicenseKey).toHaveBeenCalled()
    })
    it('returns webhook event response', async () => {
      const licenseKey = uuid()
      const licenseMock = mockLicense({ user, licenseKey })
      const teamMock = mockTeam({ teamId: 123 }) as TeamEntity
      idService.isUUID = jest.fn(() => true)
      idService.getBestLicenseKey = jest.fn().mockResolvedValueOnce(licenseMock)
      teamService.findTeamForUserOrFail = jest
        .fn()
        .mockResolvedValueOnce(teamMock)
      mockQueryBuilder(webhookRepository, undefined)
      paginationService.paginate = jest
        .fn()
        .mockResolvedValueOnce(webhookResponse)
      const returnedResponse = await resolver.getWebhookEvents(
        user,
        licenseKey,
        {}
      )
      expect(returnedResponse).toStrictEqual(webhookResponse)
      expect(idService.isUUID).toHaveBeenCalled()
      expect(idService.getBestLicenseKey).toHaveBeenCalled()
      expect(webhookRepository.createQueryBuilder).toHaveBeenCalled()
      expect(paginationService.paginate).toHaveBeenCalled()
    })
  })
})
