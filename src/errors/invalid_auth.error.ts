import { Unauthorized } from 'http-errors'
export class InvalidAuthError extends Unauthorized {
	constructor() {
		super('Invalid username or password')
	}
}