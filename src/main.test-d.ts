import { expectType, expectAssignable, expectError } from 'tsd'

import modernErrors from './main.js'

const AnyError = modernErrors()
type AnyErrorInstance = InstanceType<typeof AnyError>

expectError(modernErrors(true))

const UnknownError = AnyError.create('UnknownError')
type UnknownErrorInstance = InstanceType<typeof UnknownError>

class BaseTestError extends AnyError {
  constructor(message: string | boolean, options?: object) {
    super(String(message), options)
  }
  prop = true as const
  static staticProp = true as const
}
const TestError = AnyError.create('TestError', { custom: BaseTestError })
type TestErrorInstance = InstanceType<typeof TestError>

AnyError.create('TestError', { custom: AnyError })
AnyError.create('TestError', { custom: TestError })
expectError(AnyError.create('Test'))
expectError(AnyError.create({}))
expectError(AnyError.create())

const testError = new TestError(true)
expectType<TestErrorInstance>(testError)
expectType<BaseTestError>(testError)
expectAssignable<AnyErrorInstance>(testError)
expectAssignable<Error>(testError)
expectType<true>(TestError.staticProp)
expectType<'TestError'>(testError.name)
expectType<true>(testError.prop)

const unknownError = new UnknownError('')
expectType<UnknownErrorInstance>(unknownError)
expectAssignable<AnyErrorInstance>(unknownError)
expectAssignable<Error>(unknownError)
expectError(UnknownError.staticProp)
expectType<'UnknownError'>(unknownError.name)
expectError(unknownError.prop)

const anyError = new AnyError('')
expectType<AnyErrorInstance>(anyError)
expectAssignable<Error>(anyError)
expectError(AnyError.staticProp)
expectError(anyError.prop)

expectType<AnyErrorInstance>(AnyError.normalize(''))
expectType<AnyErrorInstance>(TestError.normalize(''))
expectType<AnyErrorInstance>(UnknownError.normalize(''))
expectError(AnyError.normalize('', true))

if (anyError instanceof TestError) {
  expectType<TestErrorInstance>(anyError)
}
if (anyError instanceof UnknownError) {
  expectType<UnknownErrorInstance>(anyError)
}
if (testError instanceof TestError) {
  expectType<TestErrorInstance>(testError)
}
if (testError instanceof UnknownError) {
  expectType<never>(testError)
}
if (testError instanceof AnyError) {
  expectType<TestErrorInstance>(testError)
}
if (testError instanceof Error) {
  expectType<TestErrorInstance>(testError)
}
