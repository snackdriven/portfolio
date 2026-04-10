
// eslint-disable-next-line @typescript-eslint/no-empty-function
jest.mock('sqreen', () => {})

describe('ShareableLinkResolver', () => {
  let resolver: ShareableLinkResolver
  let testingModule: TestingModule

  let schemaService: SchemaService
  let teamService: TeamService
  let shareableLinkService: ShareableLinkService

  let mockLink: (value?: any, isNew?: boolean) => MockEntity | undefined
  let shareableRepository: CustomMock<Repository<ShareableLinkEntity>>

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        ShareableLinkResolver,
        ...createProviderMocks(
          SchemaService,
          TeamService,
          ShareableLinkService
        ),
      ],
    }).compile()

    resolver = testingModule.get<ShareableLinkResolver>(ShareableLinkResolver)

    shareableLinkService =
      testingModule.get<ShareableLinkService>(ShareableLinkService)
    teamService = testingModule.get<TeamService>(TeamService)
    schemaService = testingModule.get<SchemaService>(SchemaService)

    shareableRepository = createMock(Repository)
    mockLink = createMockEntity(shareableRepository, ShareableLinkEntity)
  })

  describe('generateShareableLink', () => {
    const user = new UserEntity()
    const id = 1
    const schemaId = 2
    const enableSharing = true

    it('throws error if schema ID is invalid', async () => {
      await expect(
        resolver.generateShareableLink(user, schemaId, enableSharing)
      ).rejects.toThrowError(
        new UserInputError('Schema ID is invalid.', {
          invalidArgs: ['schemaId'],
        })
      )
    })

    it('returns shareable link if found by schema id', async () => {
      const user = new UserEntity()
      const returnLink = new ShareableLinkEntity()
      schemaService.findSchemaById = jest.fn().mockResolvedValueOnce(true)
      teamService.findTeamForUserOrFail = jest.fn().mockResolvedValueOnce(true)
      shareableLinkService.findShareableLinkBySchema = jest
        .fn()
        .mockResolvedValueOnce(returnLink)
      const result = await resolver.generateShareableLink(
        user,
        schemaId,
        enableSharing
      )
      expect(result).toBe(returnLink)
    })

    it('creates new shareable link if not found', async () => {
      const user = new UserEntity()
      const returnLink = mockLink({
        id,
        schemaId,
        enableSharing,
      }) as ShareableLinkEntity
      schemaService.findSchemaById = jest.fn().mockResolvedValueOnce(true)
      teamService.findTeamForUserOrFail = jest.fn().mockResolvedValueOnce(false)
      shareableLinkService.findShareableLinkBySchema = jest
        .fn()
        .mockResolvedValueOnce(false)
      shareableLinkService.createShareableLink = jest
        .fn()
        .mockResolvedValueOnce(returnLink)
      const result = await resolver.generateShareableLink(
        user,
        schemaId,
        enableSharing
      )
      expect(result).toBe(returnLink)
    })

    it('throws error if unable to create shareable link', async () => {
      schemaService.findSchemaById = jest.fn().mockResolvedValueOnce(true)
      teamService.findTeamForUserOrFail = jest.fn().mockResolvedValueOnce(true)
      shareableLinkService.createShareableLink = jest
        .fn()
        .mockResolvedValueOnce(false)
      await expect(
        resolver.generateShareableLink(user, schemaId, enableSharing)
      ).rejects.toThrowError(new Error('Error while creating shareable link.'))
      expect(schemaService.findSchemaById).toHaveBeenCalled()
      expect(teamService.findTeamForUserOrFail).toHaveBeenCalled()
      expect(shareableLinkService.createShareableLink).toHaveBeenCalled()
    })
  })

  describe('getShareableLinkByKey', () => {
    it('throws error if shareable link key is invalid', async () => {
      await expect(resolver.getShareableLinkByKey('key')).rejects.toThrowError(
        new UserInputError('Shareable link Key is invalid.', {
          invalidArgs: ['key'],
        })
      )
    })

    it('returns shareable link', async () => {
      const key = 'stringify'
      const returnLink = mockLink({ key }) as ShareableLinkEntity
      shareableLinkService.findShareableLinkByKey = jest
        .fn()
        .mockResolvedValueOnce(returnLink)
      const result = await resolver.getShareableLinkByKey(key)
      expect(result).toBe(returnLink)
    })
  })

  describe('updateShareableLink', () => {
    const linkId = 1234
    const enableSharing = true
    const user = new UserEntity()

    it('throws error if shareablelink ID is invalid', async () => {
      await expect(
        resolver.updateShareLink(user, linkId, enableSharing)
      ).rejects.toThrowError(
        new UserInputError('Shareable link ID is invalid.', {
          invalidArgs: ['linkId'],
        })
      )
    })
    it('returns shareable link', async () => {
      const schemaMock = new SchemaEntity()
      const returnLink = mockLink({
        schema: Promise.resolve(schemaMock),
      }) as ShareableLinkEntity
      shareableLinkService.findShareableLinkById = jest
        .fn()
        .mockResolvedValueOnce(returnLink)
      teamService.findTeamForUserOrFail = jest.fn().mockResolvedValueOnce(true)
      const result = await resolver.updateShareLink(user, linkId, enableSharing)
      expect(result).toBe(returnLink)
    })
  })

  describe('getShareableLinkSchema', () => {
    const licenseKey = { licenseKey: uuid() }
    const shareableLinkKey = uuid()

    it('throws error if shareable link key is invalid', async () => {
      await expect(
        resolver.getShareableLinkSchema(licenseKey, shareableLinkKey)
      ).rejects.toThrowError(
        new UserInputError('Shareable link key is invalid.', {
          invalidArgs: ['shaerableLinkKey'],
        })
      )
    })

    it('throws error if shareable link schema isnt returned', async () => {
      const mockShareableLinkSchema = new SchemaEntity()
      shareableLinkService.findShareableLinkByKey = jest
        .fn()
        .mockResolvedValueOnce(mockShareableLinkSchema)
      await expect(
        resolver.getShareableLinkSchema(licenseKey, shareableLinkKey)
      ).rejects.toThrowError(
        new UserInputError('Shareable link key is invalid.', {
          invalidArgs: ['shareableLinkKey'],
        })
      )
    })

    it('throws error if license key is invalid', async () => {
      const licenseMock = new LicenseEntity()
      const teamMock = new TeamEntity()
      const linkMock = new ShareableLinkEntity()
      const schemaMock = new SchemaEntity()
      const licenseKey = { licenseKey: uuid() }

      teamMock.licenses = Promise.resolve([licenseMock])
      schemaMock.team = Promise.resolve(teamMock)
      linkMock.schema = Promise.resolve(schemaMock)

      shareableLinkService.findShareableLinkByKey = jest
        .fn()
        .mockResolvedValueOnce(linkMock)
      await expect(
        resolver.getShareableLinkSchema(licenseKey, shareableLinkKey)
      ).rejects.toThrowError(
        new UserInputError('License key is invalid.', {
          invalidArgs: ['licenseKey'],
        })
      )
    })
    it('returns shareable link schema', async () => {
      const mockDTO = { id: '22', name: 'scheeema' }
      const licenseKey = { licenseKey: uuid() }

      const licenseMock = new LicenseEntity()
      const teamMock = new TeamEntity()
      const schemaMock = new SchemaEntity()
      const linkMock = new ShareableLinkEntity()

      licenseMock.key = licenseKey.licenseKey
      teamMock.licenses = Promise.resolve([licenseMock])
      schemaMock.team = Promise.resolve(teamMock)
      linkMock.schema = Promise.resolve(schemaMock)

      schemaMock.id = 22
      schemaMock.name = 'scheeema'

      shareableLinkService.findShareableLinkByKey = jest
        .fn()
        .mockResolvedValueOnce(linkMock)
      const result = await resolver.getShareableLinkSchema(
        licenseKey,
        'linkKey'
      )
      expect(result).toMatchObject(mockDTO)
      expect(result.id).toStrictEqual(mockDTO.id)
      expect(result.name).toStrictEqual(mockDTO.name)
    })
  })
})
