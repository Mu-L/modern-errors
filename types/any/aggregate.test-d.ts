import { expectAssignable, expectNotAssignable, expectError } from 'tsd'

import modernErrors, {
  ClassOptions,
  InstanceOptions,
  GlobalOptions,
} from '../main.js'

const AnyError = modernErrors()
const UnknownError = AnyError.subclass('UnknownError')
type UnknownInstance = InstanceType<typeof UnknownError>
const SError = AnyError.subclass('SError')
type SInstance = InstanceType<typeof SError>

const unknownErrors = [true] as [true]
const knownErrors = [new SError('')] as [SInstance]

expectAssignable<InstanceOptions>({ errors: [''] })
expectNotAssignable<ClassOptions>({ errors: [''] })
expectNotAssignable<GlobalOptions>({ errors: [''] })
expectNotAssignable<InstanceOptions>({ errors: '' })

expectError(new AnyError('', { cause: '' }).errors)
expectError(new SError('').errors)
expectError(new AnyError('', { cause: '', errors: true }))
expectError(new SError('', { errors: true }))

expectAssignable<[UnknownInstance]>(
  new AnyError('', { cause: '', errors: unknownErrors }).errors,
)
expectAssignable<[UnknownInstance]>(
  new SError('', { errors: unknownErrors }).errors,
)
expectAssignable<[SInstance]>(
  new AnyError('', { cause: '', errors: knownErrors }).errors,
)
expectAssignable<[SInstance]>(new SError('', { errors: knownErrors }).errors)
expectAssignable<[UnknownInstance]>(
  new AnyError('', { cause: new SError('', { errors: unknownErrors }) }).errors,
)
expectAssignable<[UnknownInstance]>(
  new SError('', { cause: new SError('', { errors: unknownErrors }) }).errors,
)
expectAssignable<[UnknownInstance, SInstance]>(
  new AnyError('', {
    cause: new SError('', { errors: unknownErrors }),
    errors: knownErrors,
  }).errors,
)
expectAssignable<[UnknownInstance, SInstance]>(
  new SError('', {
    cause: new SError('', { errors: unknownErrors }),
    errors: knownErrors,
  }).errors,
)