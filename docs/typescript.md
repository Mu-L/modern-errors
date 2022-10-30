# TypeScript

The [API](../README.md#api) is fully typed for TypeScript users.

## Error properties and methods

Error [classes'](../README.md#error-classes) and
[instances'](../README.md#simple-errors)
[`props`](../README.md#error-instance-properties), aggregate
[`errors`](../README.md#aggregate-errors) and
[`custom`](../README.md#class-custom-logic) methods/properties are typed.

```ts
const InputError = AnyError.subclass('InputError', {
  custom: class extends AnyError {
    isUserInput() {
      return true as const
    }
  },
})
const error = new InputError('Wrong user name', {
  props: { userId: 5 as const },
})
const { userId } = error // Inferred type: `5`
const result = error.isUserInput() // Inferred type: `true`
```

## Plugins

Plugin methods, properties and [options](../README.md#plugin-options) are typed.

```ts
// This plugin adds an `error.httpResponse()` method
import modernErrorsHttp from 'modern-errors-http'

const AnyError = modernErrors([modernErrorsHttp])

const UnknownError = AnyError.subclass('UnknownError')
const InputError = AnyError.subclass('InputError')

const inputError = new InputError('Wrong user name', {
  http: { title: false }, // Type error: `title` must be a string
})
const httpResponse = inputError.httpResponse() // Inferred type: response object
```

## Narrowing

When catching exceptions, their type can be
[narrowed](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#instanceof-narrowing)
using [`instanceof`](../README.md#check-error-classes).

```ts
const InputError = AnyError.subclass('InputError', {
  props: { isUserError: true as const },
})

try {
  // ...
} catch (error) {
  // Narrows `error` type to `InputError`
  if (error instanceof InputError) {
    const { isUserError } = error // Inferred type: `true`
  }
}
```

## Type inference

Types are automatically inferred: no explicit type declaration is needed.
[`typeof`](https://www.typescriptlang.org/docs/handbook/2/typeof-types.html),
[`ReturnType`](https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype),
etc. can be used to retrieve the type of a variable or method.

```ts
const printErrorClass = function (
  ErrorClass: ReturnType<typeof AnyError.subclass>,
) {
  // ...
}

const InputError = AnyError.subclass('InputError')
printErrorClass(InputError)
```

## Wide types

The following types are exported:
[`ErrorInstance`](../README.md#new-anyerrormessage-options),
[`ErrorClass`](../README.md#error-classes),
[`AnyErrorClass`](../README.md#anyerror),
[`GlobalOptions`](../README.md#modernerrorsplugins-options),
[`ClassOptions`](../README.md#anyerrorsubclassname-options),
[`InstanceOptions`](../README.md#new-anyerrormessage-options),
[`MethodOptions`](../README.md#plugin-options),
[`Plugin`](../README.md#plugins-1) and [`Info`](plugins.md#info-1).

Those types are wide: they do not include any information about specific
[`props`](../README.md#error-instance-properties), aggregate
[`errors`](../README.md#aggregate-errors) nor
[`custom`](../README.md#class-custom-logic) methods/properties. However, they
can include specific plugins' methods, properties and options by passing those
as a generic parameter, such as `ErrorClass<[typeof plugin]>`.

They should only be used to type unknown error instances and classes, when no
variable nor [type inference](#type-inference) is available. For example, they
can be useful when [creating plugins](plugins.md#typescript).