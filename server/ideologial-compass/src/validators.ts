// For more information about this file see https://dove.feathersjs.com/guides/cli/validators.html
import { Ajv, addFormats } from '@feathersjs/schema'
import type { FormatsPluginOptions } from '@feathersjs/schema'
import { Type, TypeGuard } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

const formats: FormatsPluginOptions = [
  'date-time',
  'time',
  'date',
  'email',
  'hostname',
  'ipv4',
  'ipv6',
  'uri',
  'uri-reference',
  'uuid',
  'uri-template',
  'json-pointer',
  'relative-json-pointer',
  'regex'
]

export const dataValidator: Ajv = addFormats(new Ajv({ strict: false }), formats)

export const queryValidator: Ajv = addFormats(
  new Ajv({
    coerceTypes: true,
    strict: false
  }),
  formats
)

function schemaOf(schemaOf: string, value: unknown, schema: unknown) {
  switch (schemaOf) {
    case 'Constructor':
      return TypeGuard.TConstructor(schema) && Value.Check(schema, value) // not supported
    case 'Function':
      return TypeGuard.TFunction(schema) && Value.Check(schema, value) // not supported
    case 'Date':
      return TypeGuard.TDate(schema) && Value.Check(schema, value)
    case 'Promise':
      return TypeGuard.TPromise(schema) && Value.Check(schema, value) // not supported
    case 'Uint8Array':
      return TypeGuard.TUint8Array(schema) && Value.Check(schema, value)
    case 'Undefined':
      return TypeGuard.TUndefined(schema) && Value.Check(schema, value) // not supported
    case 'Void':
      return TypeGuard.TVoid(schema) && Value.Check(schema, value)
    default:
      return false
  }
}

export function createAjv() {
  return addFormats(new Ajv({ strict: false }), [
    'date-time',
    'time',
    'date',
    'email',
    'hostname',
    'ipv4',
    'ipv6',
    'uri',
    'uri-reference',
    'uuid',
    'uri-template',
    'json-pointer',
    'relative-json-pointer',
    'regex'
  ])
    .addKeyword({ type: 'object', keyword: 'instanceOf', validate: schemaOf })
    .addKeyword({ type: 'null', keyword: 'typeOf', validate: schemaOf })
    .addKeyword('exclusiveMinimumTimestamp')
    .addKeyword('exclusiveMaximumTimestamp')
    .addKeyword('minimumTimestamp')
    .addKeyword('maximumTimestamp')
    .addKeyword('minByteLength')
    .addKeyword('maxByteLength')
}

const ajv = createAjv()

const R = ajv.validate(
  Type.Object({
    // const R = true
    buffer: Type.Uint8Array(),
    date: Type.Date(),
    void: Type.Void()
  }),
  {
    buffer: new Uint8Array(),
    date: new Date(),
    void: null
  }
)