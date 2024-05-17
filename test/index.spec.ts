// test/index.spec.ts
import { SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';

describe('timstrucken.com worker', () => {
	it('Forward host to Gravatar', async () => {
		const response = await SELF.fetch('https://example.com');
		expect(response.url).toBe('https://gravatar.com/timstrucken');
	});

	it('Forward host/ to Gravatar', async () => {
		const response = await SELF.fetch('https://example.com/');
		expect(response.url).toBe('https://gravatar.com/timstrucken');
	});

	it('Forward host/contact to Gravatar', async () => {
		const response = await SELF.fetch('https://example.com/contact');
		expect(response.url).toBe('https://gravatar.com/timstrucken');
	});

	it('Respond with 404 to host/xyz', async () => {
		const response = await SELF.fetch('https://example.com/xyz');
    expect(response.status).toBe(404);
	});
});
