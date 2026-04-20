import { z } from 'zod'

type ToolJsonSchema = {
	type?: 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null'
	description?: string
	required?: string[]
	properties?: Record<string, ToolJsonSchema>
	items?: ToolJsonSchema
	enum?: unknown[]
}

export function createInputSchemaFromJsonSchema(
	schema: unknown
): z.ZodObject<z.ZodRawShape> {
	const converted = toZodSchema(schema as ToolJsonSchema)

	if (converted instanceof z.ZodObject) {
		return converted.loose()
	}

	// callModel function tools require object input schemas.
	return z.object({ value: converted }).loose()
}

function toZodSchema(schema: ToolJsonSchema): z.ZodTypeAny {
	if (Array.isArray(schema.enum) && schema.enum.length > 0) {
		const stringEnum = schema.enum.filter(
			(value): value is string => typeof value === 'string'
		)

		if (stringEnum.length === schema.enum.length && stringEnum.length > 0) {
			return withDescription(
				z.enum(stringEnum as [string, ...string[]]),
				schema.description
			)
		}
	}

	switch (schema.type) {
		case 'object': {
			const properties = schema.properties ?? {}
			const required = new Set(schema.required ?? [])

			const shape = Object.fromEntries(
				Object.entries(properties).map(([key, value]) => {
					const propertySchema = toZodSchema(value)
					return [key, required.has(key) ? propertySchema : propertySchema.optional()]
				})
			)

			return withDescription(z.object(shape), schema.description)
		}
		case 'array': {
			const itemSchema = schema.items ? toZodSchema(schema.items) : z.unknown()
			return withDescription(z.array(itemSchema), schema.description)
		}
		case 'string':
			return withDescription(z.string(), schema.description)
		case 'number':
			return withDescription(z.number(), schema.description)
		case 'boolean':
			return withDescription(z.boolean(), schema.description)
		case 'null':
			return withDescription(z.null(), schema.description)
		default:
			return withDescription(z.unknown(), schema.description)
	}
}

function withDescription<T extends z.ZodTypeAny>(schema: T, description?: string): T {
	if (!description) return schema
	return schema.describe(description) as T
}
