export class UnknownProviderError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'UnknownProviderError'
	}
}
