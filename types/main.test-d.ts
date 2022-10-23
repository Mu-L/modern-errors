import {
  expectType,
  expectAssignable,
  expectNotAssignable,
  expectError,
} from 'tsd'
import type { ErrorName } from 'error-custom-class'

import modernErrors, {
  AnyErrorClass,
  ErrorClass,
  ErrorInstance,
  GlobalOptions,
  ClassOptions,
  InstanceOptions,
  MethodOptions,
  Plugin,
  Info,
} from './main.js'

const exception = {} as unknown

const AnyError = modernErrors()
type AnyInstance = InstanceType<typeof AnyError>
const wideError = {} as any as AnyInstance
expectAssignable<AnyErrorClass>(AnyError)
expectAssignable<ErrorClass>(AnyError)
expectAssignable<ErrorInstance>(wideError)
expectAssignable<Error>(wideError)
expectType<ErrorName>(wideError.name)
expectAssignable<Error>({} as ErrorInstance)
expectType<ErrorInstance>({} as InstanceType<ErrorClass>)

const SError = AnyError.subclass('SError')
type SInstance = typeof SError['prototype']
const sError = new SError('')
expectNotAssignable<AnyErrorClass>(SError)
expectAssignable<ErrorClass>(SError)
expectAssignable<SInstance>(sError)
expectAssignable<AnyInstance>(sError)
expectAssignable<ErrorInstance>(sError)
expectAssignable<Error>(sError)
expectType<'SError'>(sError.name)
expectError(SError.normalize(''))
if (exception instanceof SError) {
  expectType<SInstance>(exception)
}

const unknownError = new AnyError('', { cause: '' })
type UnknownInstance = typeof unknownError

expectAssignable<AnyInstance>(unknownError)
expectAssignable<ErrorInstance>(unknownError)
expectAssignable<Error>(unknownError)
expectAssignable<UnknownInstance>(unknownError)
expectType<'UnknownError'>('' as UnknownInstance['name'])
expectType<'UnknownError'>(unknownError.name)
expectType<ErrorName>({} as ReturnType<typeof AnyError.normalize>['name'])
expectNotAssignable<UnknownInstance>(new AnyError('', { cause: sError }))
expectAssignable<SInstance>(AnyError.normalize(sError))
expectAssignable<UnknownInstance>(new AnyError('', { cause: unknownError }))
expectAssignable<UnknownInstance>(AnyError.normalize(unknownError))
expectAssignable<UnknownInstance>(new AnyError('', { cause: new Error('') }))
expectAssignable<UnknownInstance>(AnyError.normalize(new Error('')))
expectAssignable<UnknownInstance>(new AnyError('', { cause: undefined }))
expectAssignable<UnknownInstance>(AnyError.normalize(undefined))
expectAssignable<UnknownInstance>(AnyError.normalize(''))
if (unknownError instanceof AnyError) {
  expectAssignable<UnknownInstance>(unknownError)
}

const anyError = new AnyError('', { cause: sError })
expectError(new AnyError())
expectError(new AnyError(true))
expectError(new AnyError('', true))
expectError(new AnyError('', { cause: '', other: true }))
expectAssignable<SInstance>(anyError)
expectAssignable<ErrorInstance>(anyError)
expectAssignable<Error>(anyError)
expectType<'SError'>(anyError.name)
expectAssignable<SInstance>(AnyError.normalize(sError))
expectError(AnyError.normalize('', true))
if (exception instanceof AnyError) {
  expectAssignable<AnyInstance>(exception)
}

const SSError = SError.subclass('SSError')
type SSInstance = typeof SSError['prototype']

const ssError = new SSError('')
expectNotAssignable<AnyErrorClass>(SSError)
expectAssignable<ErrorClass>(SSError)
expectAssignable<SSInstance>(ssError)
expectAssignable<AnyInstance>(ssError)
expectAssignable<ErrorInstance>(ssError)
expectAssignable<Error>(ssError)
expectType<'SSError'>(ssError.name)
expectError(SSError.normalize(''))
if (exception instanceof SSError) {
  expectType<SSInstance>(exception)
}

class BCError extends AnyError {
  constructor(
    message: string,
    options?: InstanceOptions & { cProp?: true },
    extra?: true,
  ) {
    super(message, options, extra)
  }
  prop = true as const
  static staticProp = true as const
}
const CError = AnyError.subclass('CError', { custom: BCError })
type CInstance = typeof CError['prototype']

const cError = new CError('', { cProp: true })
expectError(new CError())
expectError(new CError(true))
expectError(new CError('', true))
expectError(new CError('', { other: true }))
expectError(new CError('', { cause: '', other: true }))
expectError(new CError('', { cProp: false }))
expectNotAssignable<AnyErrorClass>(CError)
expectAssignable<ErrorClass>(CError)
expectAssignable<CInstance>(cError)
expectAssignable<AnyInstance>(cError)
expectAssignable<ErrorInstance>(cError)
expectAssignable<Error>(cError)
expectType<true>(cError.prop)
expectType<true>(CError.staticProp)
expectType<'CError'>(cError.name)
expectError(CError.normalize(''))

const SCError = CError.subclass('SCError')
type SCInstance = typeof SCError['prototype']

const scError = new SCError('', { cProp: true })
expectError(new SCError())
expectError(new SCError(true))
expectError(new SCError('', true))
expectError(new SCError('', { other: true }))
expectError(new SCError('', { cause: '', other: true }))
expectError(new SCError('', { cProp: false }))
expectNotAssignable<AnyErrorClass>(SCError)
expectAssignable<ErrorClass>(SCError)
expectAssignable<SCInstance>(scError)
expectAssignable<AnyInstance>(scError)
expectAssignable<ErrorInstance>(scError)
expectAssignable<Error>(scError)
expectType<true>(scError.prop)
expectType<true>(SCError.staticProp)
expectType<'SCError'>(scError.name)
expectError(SCError.normalize(''))

class BCSError extends SError {
  constructor(
    message: string,
    options?: InstanceOptions & { cProp?: true },
    extra?: true,
  ) {
    super(message, options, extra)
  }
  prop = true as const
  static staticProp = true as const
}
const CSError = CError.subclass('CSError', { custom: BCSError })
type CSInstance = typeof CSError['prototype']

const csError = new CSError('', { cProp: true })
expectError(new CSError())
expectError(new CSError(true))
expectError(new CSError('', true))
expectError(new CSError('', { other: true }))
expectError(new CSError('', { cause: '', other: true }))
expectError(new CSError('', { cProp: false }))
expectNotAssignable<AnyErrorClass>(CSError)
expectAssignable<ErrorClass>(CSError)
expectAssignable<CSInstance>(csError)
expectAssignable<AnyInstance>(csError)
expectAssignable<ErrorInstance>(csError)
expectAssignable<Error>(csError)
expectType<true>(csError.prop)
expectType<true>(CSError.staticProp)
expectType<'CSError'>(csError.name)
expectError(CSError.normalize(''))

class BCCError extends CError {
  constructor(
    message: string,
    options?: InstanceOptions & { cProp?: true; ccProp?: true },
    extra?: boolean,
  ) {
    super(message, options, true)
  }
  deepProp = true as const
  static deepStaticProp = true as const
}
const CCError = CError.subclass('CCError', { custom: BCCError })
type CCInstance = typeof CCError['prototype']

const ccError = new CCError('', { cProp: true, ccProp: true })
expectError(new CCError())
expectError(new CCError(true))
expectError(new CCError('', true))
expectError(new CCError('', { other: true }))
expectError(new CCError('', { cause: '', other: true }))
expectError(new CCError('', { cProp: false }))
expectError(new CCError('', { ccProp: false }))
expectNotAssignable<AnyErrorClass>(CCError)
expectAssignable<ErrorClass>(CCError)
expectAssignable<CCInstance>(ccError)
expectAssignable<AnyInstance>(ccError)
expectAssignable<ErrorInstance>(ccError)
expectAssignable<Error>(ccError)
expectType<true>(ccError.prop)
expectType<true>(ccError.deepProp)
expectType<true>(CCError.staticProp)
expectType<true>(CCError.deepStaticProp)
expectType<'CCError'>(ccError.name)
expectError(CCError.normalize(''))

const unknownErrors = [true] as [true]
const knownErrors = [new CCError('')] as [CCInstance]
expectAssignable<[UnknownInstance]>(
  new AnyError('', { cause: '', errors: unknownErrors }).errors,
)
expectAssignable<[UnknownInstance]>(
  new CCError('', { errors: unknownErrors }).errors,
)
expectAssignable<[CCInstance]>(
  new AnyError('', { cause: '', errors: knownErrors }).errors,
)
expectAssignable<[CCInstance]>(new CCError('', { errors: knownErrors }).errors)
expectAssignable<[UnknownInstance]>(
  new AnyError('', { cause: new CCError('', { errors: unknownErrors }) })
    .errors,
)
expectAssignable<[UnknownInstance]>(
  new CCError('', { cause: new CCError('', { errors: unknownErrors }) }).errors,
)
expectAssignable<[UnknownInstance, CCInstance]>(
  new AnyError('', {
    cause: new CCError('', { errors: unknownErrors }),
    errors: knownErrors,
  }).errors,
)
expectAssignable<[UnknownInstance, CCInstance]>(
  new CCError('', {
    cause: new CCError('', { errors: unknownErrors }),
    errors: knownErrors,
  }).errors,
)
expectError(new AnyError('', { cause: '' }).errors)
expectError(new CCError('').errors)
expectError(new AnyError('', { cause: '', errors: true }))
expectError(new CCError('', { errors: true }))
expectAssignable<InstanceOptions>({ errors: [''] })
expectNotAssignable<InstanceOptions>({ errors: '' })
expectNotAssignable<GlobalOptions>({ errors: [''] })
expectNotAssignable<ClassOptions>({ errors: [''] })

const cause = {} as Error & { prop: true }
expectType<true>(new AnyError('', { cause }).prop)
expectAssignable<InstanceOptions>({ cause: '' })
expectNotAssignable<GlobalOptions>({ cause: '' })
expectNotAssignable<ClassOptions>({ cause: '' })

modernErrors([], { props: {} })
AnyError.subclass('TestError', { props: {} })
SError.subclass('TestError', { props: {} })
new AnyError('', { cause: '', props: {} })
new CCError('', { cause: '', props: {} })
expectAssignable<GlobalOptions>({ props: {} })
expectAssignable<ClassOptions>({ props: {} })
expectAssignable<InstanceOptions>({ props: {} })
expectError(modernErrors([], { props: true }))
expectError(AnyError.subclass('TestError', { props: true }))
expectError(SError.subclass('TestError', { props: true }))
expectError(new AnyError('', { cause: '', props: true }))
expectError(new CCError('', { props: true }))
expectNotAssignable<GlobalOptions>({ props: true })
expectNotAssignable<ClassOptions>({ props: true })
expectNotAssignable<InstanceOptions>({ props: true })
const QAnyError = modernErrors([], {
  props: { one: true as const, three: false as const },
})
const SQAError = QAnyError.subclass('SQAError')
const SSQAError = SQAError.subclass('SSQAError')
const QError = AnyError.subclass('QError', {
  props: { one: true as const, three: false as const },
})
const SQError = QError.subclass('SQError')
const QSError = SError.subclass('QSError', {
  props: { one: true as const, three: false as const },
})
const MQAError = QAnyError.subclass('MQAError', {
  props: { two: true as const, three: true as const },
})
const MSQAError = SQAError.subclass('MSQAError', {
  props: { two: true as const, three: true as const },
})
const MQError = QError.subclass('MQError', {
  props: { two: true as const, three: true as const },
})
expectType<true>(new QAnyError('', { cause: '' }).one)
expectType<true>(new SQAError('', { cause: '' }).one)
expectType<true>(new SSQAError('', { cause: '' }).one)
expectType<true>(new QError('', { cause: '' }).one)
expectType<true>(new SQError('', { cause: '' }).one)
expectType<true>(new QSError('', { cause: '' }).one)
expectType<true>(
  new AnyError('', { cause: '', props: { one: true as const } }).one,
)
expectType<true>(new CCError('', { props: { one: true as const } }).one)
expectAssignable<{ one: true; two: true; three: true }>(new MQAError(''))
expectAssignable<{ one: true; two: true; three: true }>(new MSQAError(''))
expectAssignable<{ one: true; two: true; three: true }>(
  new QAnyError('', {
    cause: '',
    props: { two: true as const, three: true as const },
  }),
)
expectAssignable<{ one: true; two: true; three: true }>(new MQError(''))
expectAssignable<{ one: true; two: true; three: true }>(
  new QError('', { props: { two: true as const, three: true as const } }),
)
expectAssignable<{ one: true; two: true; three: true }>(
  new QSError('', { props: { two: true as const, three: true as const } }),
)
expectAssignable<{ one: true; two: true; three: true }>(
  new AnyError('', {
    cause: new SError('', {
      props: { two: true as const, three: false as const },
    }),
    props: { one: true as const, three: true as const },
  }),
)

const name = 'test'
const getOptions = (input: true, full: boolean) => input
const isOptions = (input: unknown) => input === true
const instanceMethod = (info: Info['instanceMethods'], arg: 'arg') => arg
const instanceMethods = { instanceMethod }
const staticMethod = (info: Info['staticMethods'], arg: 'arg') => arg
const staticMethods = { staticMethod }
const properties = (info: Info['properties']) => ({ property: true as const })
const plugin = {
  name,
  getOptions,
  isOptions,
  instanceMethods,
  staticMethods,
  properties,
} as const

const PAnyError = modernErrors([plugin])
const PSError = PAnyError.subclass('PSError')
const GPAnyError = modernErrors([{} as Plugin])
const GPSError = GPAnyError.subclass('GPSError')
type PAnyErrorClass = AnyErrorClass<[typeof plugin]>
type PErrorClass = ErrorClass<[typeof plugin]>

expectAssignable<AnyErrorClass>(PAnyError)
expectAssignable<PAnyErrorClass>(PAnyError)
expectAssignable<ErrorClass>(PAnyError)
expectAssignable<PErrorClass>(PAnyError)
expectNotAssignable<AnyErrorClass>(PSError)
expectNotAssignable<PAnyErrorClass>(PSError)
expectAssignable<ErrorClass>(PSError)
expectAssignable<PErrorClass>(PSError)
expectAssignable<AnyErrorClass>(GPAnyError)
expectNotAssignable<PAnyErrorClass>(GPAnyError)
expectAssignable<ErrorClass>(GPAnyError)
expectNotAssignable<PErrorClass>(GPAnyError)
expectNotAssignable<AnyErrorClass>(GPSError)
expectNotAssignable<PAnyErrorClass>(GPSError)
expectAssignable<ErrorClass>(GPSError)
expectNotAssignable<PErrorClass>(GPSError)

const paError = new PAnyError('', { cause: '' })
const psError = new PSError('')
const gpaError = new GPAnyError('', { cause: '' })
const gpsError = new GPSError('')
type PErrorInstance = ErrorInstance<[typeof plugin]>
type PUnknownInstance = typeof paError
expectType<'UnknownError'>('' as PUnknownInstance['name'])

expectAssignable<Error>(paError)
expectAssignable<ErrorInstance>(paError)
expectAssignable<PErrorInstance>(paError)
expectAssignable<Error>(psError)
expectAssignable<ErrorInstance>(psError)
expectAssignable<PErrorInstance>(psError)
expectAssignable<Error>(gpaError)
expectAssignable<ErrorInstance>(gpaError)
expectNotAssignable<PErrorInstance>(gpaError)
expectAssignable<Error>(gpsError)
expectAssignable<ErrorInstance>(gpsError)
expectNotAssignable<PErrorInstance>(gpsError)

expectNotAssignable<PUnknownInstance>(new PAnyError('', { cause: psError }))
expectNotAssignable<PUnknownInstance>(PAnyError.normalize(psError))

modernErrors([])
modernErrors([], {})
modernErrors([plugin], {})
expectError(modernErrors(true))
modernErrors([plugin], { test: true })
PAnyError.subclass('TestError', { test: true })
new PAnyError('', { test: true })
new PSError('', { test: true })
expectAssignable<GlobalOptions<[typeof plugin]>>({ test: true })
expectAssignable<ClassOptions<[typeof plugin]>>({ test: true })
expectAssignable<InstanceOptions<[typeof plugin]>>({ test: true })
expectAssignable<MethodOptions<typeof plugin>>(true)

expectError(modernErrors([plugin], { test: 'true' }))
expectError(PAnyError.subclass('TestError', { test: 'true' }))
expectError(new PAnyError('', { test: 'true' }))
expectError(new PSError('', { test: 'true' }))
expectNotAssignable<GlobalOptions<[typeof plugin]>>({ test: 'true' })
expectNotAssignable<ClassOptions<[typeof plugin]>>({ test: 'true' })
expectNotAssignable<InstanceOptions<[typeof plugin]>>({ test: 'true' })
expectNotAssignable<MethodOptions<typeof plugin>>('true')

expectError(modernErrors([], { other: true }))
expectError(modernErrors([plugin as Plugin], { other: true }))
expectError(modernErrors([{ ...plugin, name: '' as string }], { other: true }))
expectError(new PAnyError('', { cause: '', other: true }))
expectError(new PSError('', { other: true }))
expectError(new PSError('', { cause: '', other: true }))
expectNotAssignable<GlobalOptions>({ other: true })
expectNotAssignable<ClassOptions>({ other: true })
expectNotAssignable<InstanceOptions>({ other: true })

expectError(
  modernErrors([plugin as Omit<typeof plugin, 'getOptions'>], { test: true }),
)

expectAssignable<Plugin>(plugin)
expectAssignable<Plugin>({ name })
expectNotAssignable<Plugin>({})
expectNotAssignable<Plugin>({ name, unknown: true })
expectNotAssignable<Plugin>({ ...plugin, getOptions: true })
expectAssignable<Plugin>({ ...plugin, getOptions: () => true })
expectNotAssignable<Plugin>({
  ...plugin,
  getOptions: (input: true, full: string) => input,
})
expectNotAssignable<Plugin>({ ...plugin, isOptions: true })
expectNotAssignable<Plugin>({ ...plugin, isOptions: (input: true) => true })
expectNotAssignable<Plugin>({ ...plugin, isOptions: (input: unknown) => 0 })
expectAssignable<Plugin>({ ...plugin, instanceMethods: {} })
expectNotAssignable<Plugin>({ ...plugin, instanceMethods: true })
expectNotAssignable<Plugin>({
  ...plugin,
  instanceMethods: { instanceMethod: true },
})
expectAssignable<Plugin>({ ...plugin, staticMethods: {} })
expectNotAssignable<Plugin>({ ...plugin, staticMethods: true })
expectNotAssignable<Plugin>({
  ...plugin,
  staticMethods: { staticMethod: true },
})
expectNotAssignable<Plugin>({ ...plugin, properties: true })
expectNotAssignable<Plugin>({ ...plugin, properties: (info: true) => ({}) })
expectNotAssignable<Plugin>({
  ...plugin,
  properties: (info: Info['properties'], arg: true) => ({}),
})
expectNotAssignable<Plugin>({
  ...plugin,
  properties: (info: Info['properties']) => true,
})
expectNotAssignable<Plugin>({
  ...plugin,
  properties: (info: Info['properties']) => [],
})

const imInfo = {} as Info['instanceMethods']
expectError(imInfo.other)
expectAssignable<Error>(imInfo.error)
expectAssignable<boolean>(imInfo.options)
expectType<boolean>(imInfo.showStack)
expectAssignable<typeof AnyError>(imInfo.AnyError)
expectAssignable<AnyErrorClass>(imInfo.AnyError)
expectAssignable<object>(imInfo.ErrorClasses)
expectError(imInfo.ErrorClasses.other)
expectError(new imInfo.ErrorClasses.AnyError('', { cause: '' }))
const iUnknownError = new imInfo.ErrorClasses.UnknownError('')
expectAssignable<ErrorInstance>(iUnknownError)
expectAssignable<Function | undefined>(imInfo.ErrorClasses.SError)
expectAssignable<typeof imInfo.ErrorClasses.TestError>(SError)

const smInfo = {} as Info['staticMethods']
expectType<Info['instanceMethods']['options']>(smInfo.options)
expectType<Info['instanceMethods']['AnyError']>(smInfo.AnyError)
expectType<Info['instanceMethods']['ErrorClasses']>(smInfo.ErrorClasses)
expectType<Info['instanceMethods']['errorInfo']>(smInfo.errorInfo)
expectError(smInfo.other)
expectError(smInfo.error)
expectError(smInfo.showStack)

const pInfo = {} as Info['properties']
expectType<Info['instanceMethods']['error']>(pInfo.error)
expectType<Info['instanceMethods']['options']>(pInfo.options)
expectType<Info['instanceMethods']['showStack']>(pInfo.showStack)
expectType<Info['instanceMethods']['AnyError']>(pInfo.AnyError)
expectType<Info['instanceMethods']['ErrorClasses']>(pInfo.ErrorClasses)
expectType<Info['instanceMethods']['errorInfo']>(pInfo.errorInfo)

const eInfo = imInfo.errorInfo(iUnknownError)
imInfo.errorInfo('')
expectType<Info['errorInfo']>(eInfo)
expectType<Info['instanceMethods']['error']>(eInfo.error)
expectType<Info['instanceMethods']['options']>(eInfo.options)
expectType<Info['instanceMethods']['showStack']>(eInfo.showStack)
expectError(eInfo.other)
expectError(eInfo.AnyError)
expectError(eInfo.ErrorClasses)
expectError(eInfo.errorInfo)

expectType<'arg'>(paError.instanceMethod('arg'))
expectType<'arg'>(psError.instanceMethod('arg'))
expectType<'arg'>(paError.instanceMethod('arg', true))
expectType<'arg'>(psError.instanceMethod('arg', true))
expectError(paError.instanceMethod({} as Info['instanceMethods'], 'arg'))
expectError(psError.instanceMethod({} as Info['instanceMethods'], 'arg'))
expectError(paError.instanceMethod('arg', false))
expectError(psError.instanceMethod('arg', false))
expectError(paError.instanceMethod(true))
expectError(psError.instanceMethod(true))
expectError(paError.otherMethod())
expectError(psError.otherMethod())
expectError(gpaError.otherMethod())
expectError(gpsError.otherMethod())
if (exception instanceof PSError) {
  expectType<'arg'>(exception.instanceMethod('arg'))
}

expectType<'arg'>(PAnyError.staticMethod('arg'))
expectType<'arg'>(PAnyError.staticMethod('arg', true))
expectError(
  expectType<'arg'>(PAnyError.staticMethod({} as Info['staticMethods'], 'arg')),
)
expectError(expectType<'arg'>(PAnyError.staticMethod('arg', false)))
expectError(expectType<'arg'>(PAnyError.staticMethod(true)))
expectError(PSError.staticMethod())
expectError(GPSError.staticMethod())
expectError(PAnyError.otherMethod())
expectError(GPAnyError.otherMethod())
expectError(PSError.otherMethod())
expectError(GPSError.otherMethod())

expectType<true>(paError.property)
expectType<true>(psError.property)
expectError(paError.otherProperty)
expectError(psError.otherProperty)
expectError(gpaError.otherProperty)
expectError(gpsError.otherProperty)
if (exception instanceof PSError) {
  expectType<true>(exception.property)
}

expectType<'GPSError'>(gpsError.name)
expectAssignable<InstanceType<typeof GPSError>>(gpsError)
expectAssignable<InstanceType<typeof GPAnyError>>(gpsError)
expectAssignable<InstanceType<typeof GPAnyError>>(GPAnyError.normalize(''))
if (exception instanceof GPAnyError) {
  expectAssignable<InstanceType<typeof GPAnyError>>(exception)
}
if (exception instanceof GPSError) {
  expectAssignable<InstanceType<typeof GPSError>>(exception)
}

expectError(AnyError.subclass())
expectError(PAnyError.subclass())
expectError(CCError.subclass())
expectError(AnyError.subclass({}))
expectError(PAnyError.subclass({}))
expectError(CCError.subclass({}))
expectType<never>(AnyError.subclass('AnyError'))
expectType<never>(PAnyError.subclass('AnyError'))
expectType<never>(CCError.subclass('AnyError'))
expectError(AnyError.subclass('Test'))
expectError(PAnyError.subclass('Test'))
expectError(CCError.subclass('Test'))
expectError(AnyError.subclass('TestError', true))
expectError(PAnyError.subclass('TestError', true))
expectError(CCError.subclass('TestError', true))
expectError(AnyError.subclass('TestError', { other: true }))
expectError(PAnyError.subclass('TestError', { other: true }))
expectError(CCError.subclass('TestError', { other: true }))
expectError(AnyError.subclass('TestError', { custom: true }))
expectError(PAnyError.subclass('TestError', { custom: true }))
expectError(CCError.subclass('TestError', { custom: true }))
expectNotAssignable<ClassOptions>({ custom: true })

expectError(AnyError.subclass('TestError', { custom: class {} }))
expectError(PAnyError.subclass('TestError', { custom: class {} }))
expectError(CCError.subclass('TestError', { custom: class {} }))
expectError(AnyError.subclass('TestError', { custom: class extends Object {} }))
expectError(
  PAnyError.subclass('TestError', { custom: class extends Object {} }),
)
expectError(CCError.subclass('TestError', { custom: class extends Object {} }))
expectError(AnyError.subclass('TestError', { custom: class extends Error {} }))
expectError(PAnyError.subclass('TestError', { custom: class extends Error {} }))
expectError(CCError.subclass('TestError', { custom: class extends Error {} }))
expectError(CError.subclass('TestError', { custom: class extends AnyError {} }))
expectError(CCError.subclass('TestError', { custom: class extends CError {} }))
expectError(
  AnyError.subclass('UnknownError', { custom: class extends AnyError {} }),
)

AnyError.subclass('TestError', {
  custom: class extends AnyError {
    constructor(
      message: ConstructorParameters<typeof AnyError>[0],
      options?: InstanceOptions,
    ) {
      super(message, options)
    }
  },
})
AnyError.subclass('TestError', {
  custom: class extends AnyError {
    constructor(
      message: string,
      options?: ConstructorParameters<typeof AnyError>[1],
    ) {
      super(message, options)
    }
  },
})
AnyError.subclass('TestError', {
  custom: class extends AnyError {
    constructor(message: string, options?: InstanceOptions) {
      super(message, options)
    }
  },
})
PAnyError.subclass('TestError', {
  custom: class extends PAnyError {
    constructor(message: string, options?: InstanceOptions) {
      super(message, options)
    }
  },
})
PAnyError.subclass('TestError', {
  custom: class extends PAnyError {
    constructor(message: string, options?: InstanceOptions<[typeof plugin]>) {
      super(message, options)
    }
  },
})
AnyError.subclass('TestError', {
  custom: class extends AnyError {
    constructor(message: string, options?: object) {
      super(message, options)
    }
  },
})
expectError(
  AnyError.subclass('TestError', {
    custom: class extends AnyError {
      constructor(options?: object) {
        super('', options)
      }
    },
  }),
)
expectError(
  AnyError.subclass('TestError', {
    custom: class extends AnyError {
      constructor() {
        super()
      }
    },
  }),
)
expectError(
  AnyError.subclass('TestError', {
    custom: class extends AnyError {
      constructor(message: string, options?: true) {
        super(message, {})
      }
    },
  }),
)
expectError(
  AnyError.subclass('TestError', {
    custom: class extends AnyError {
      constructor(
        message: string,
        options?: InstanceOptions & { cause?: true },
      ) {
        super(message, options)
      }
    },
  }),
)
AnyError.subclass('TestError', {
  custom: class extends CError {
    constructor(message: string, options?: InstanceOptions) {
      super(message, options)
    }
  },
})
expectError(
  CError.subclass('TestError', {
    custom: class extends CError {
      constructor(
        message: string,
        options?: InstanceOptions & { cProp?: false },
        extra?: true,
      ) {
        super(message, options, extra)
      }
    },
  }),
)
expectError(
  CError.subclass('TestError', {
    custom: class extends CError {
      constructor(message: string, options?: InstanceOptions, extra?: false) {
        super(message, options, true)
      }
    },
  }),
)
expectError(
  class extends CError {
    constructor() {
      super('', {}, false)
    }
  },
)

const OneError = PAnyError.subclass('OneError', {
  custom: class extends PAnyError {
    property = true as const
  },
})
expectType<true>(new OneError('').property)
const TwoError = PAnyError.subclass('TwoError', {
  custom: class extends PAnyError {
    instanceMethod = (arg: 'arg') => arg
  },
})
expectType<'arg'>(new TwoError('').instanceMethod('arg'))
const ThreeError = PAnyError.subclass('ThreeError', {
  custom: class extends PAnyError {
    static staticMethod(arg: 'arg') {
      return arg
    }
  },
})
expectError(ThreeError.staticMethod('arg'))
const FourError = PAnyError.subclass('FourError', {
  custom: class extends PAnyError {
    static staticMethod = (arg: 'arg') => arg
  },
})
expectError(FourError.staticMethod('arg'))
const PropsError = AnyError.subclass('PropsError', { props: { one: true } })
const ChildPropsError = PropsError.subclass('ChildPropsError', {
  custom: class extends PropsError {
    one = false as const
  },
})
expectType<false>(new ChildPropsError('').one)

// `tsd`'s `expectError()` fails to properly lint those, so they must be
// manually checked by uncommenting those lines.
// expectError(
//   class extends PAnyError {
//     property = true as boolean
//   },
// )
// expectError(
//   class extends PAnyError {
//     instanceMethod = (arg: string) => arg
//   },
// )
// expectError(
//   class extends PAnyError {
//     static staticMethod = (arg: string) => arg
//   },
// )
// expectError(
//   class extends AnyError {
//     message = true
//   },
// )
// expectError(
//   class extends PropsError {
//     one = ''
//   },
// )

const MessageMethodAnyError = modernErrors([
  { name, instanceMethods: { message: () => {} } },
])
expectType<Error['message']>(
  new MessageMethodAnyError('', { cause: '' }).message,
)
const CorePropsAnyError = modernErrors([
  {
    name,
    properties: () =>
      ({
        name: 'test',
        message: 'test',
        stack: 'test',
        cause: 'test',
        errors: ['test'],
        two: 'test',
        three: 'test',
      } as const),
    instanceMethods: { one: () => {}, two: () => {} },
  },
])
const CorePropsError = CorePropsAnyError.subclass('CorePropsError')
const corePropsError = new CorePropsError('')
expectType<'test'>(corePropsError.message)
expectType<'test'>(corePropsError.stack)
expectType<'CorePropsError'>(corePropsError.name)
expectType<Error['cause']>(corePropsError.cause)
expectError(corePropsError.errors)
expectNotAssignable<string>(corePropsError.two)
expectNotAssignable<string>(
  new CorePropsError('', { props: { one: '' as const } }).one,
)
expectType<never>(new CorePropsError('', { props: { three: '' as const } }))
expectType<'test'>(
  new CorePropsError('', { props: { three: 'test' as const } }).three,
)
expectType<'test'>(
  new SError('', { props: { message: 'test' as const } }).message,
)
expectType<never>(new SError('', { props: { message: true as const } }))
expectType<'test'>(new SError('', { props: { stack: 'test' as const } }).stack)
expectType<never>(new SError('', { props: { stack: true as const } }))
expectType<'SError'>(new SError('', { props: { name: 'test' as const } }).name)
expectType<Error['cause']>(
  new SError('', { props: { cause: 'test' as const } }).cause,
)
expectError(new SError('', { props: { errors: ['test'] } }).errors)
const DuplicateProppertiesAnyError = modernErrors([
  { name: 'one' as const, properties: () => ({ prop: 'one' as const }) },
  { name: 'two' as const, properties: () => ({ prop: 'two' as const }) },
])
expectType<undefined>(new DuplicateProppertiesAnyError('', { cause: '' }).prop)

expectError(new SError('', { cause: new CError('') }).prop)
expectError(new SError('', { cause: new PAnyError('') }).property)
expectError(new SError('', { cause: new PAnyError('') }).instanceMethod)
expectError(
  new SError('', { cause: new SError('', { props: { prop: true } }) }).prop,
)

if (cError instanceof SError) {
  expectType<never>(cError)
}
if (cError instanceof CError) {
  expectAssignable<CInstance>(cError)
}
if (cError instanceof AnyError) {
  expectAssignable<CInstance>(cError)
}
if (cError instanceof Error) {
  expectAssignable<CInstance>(cError)
}