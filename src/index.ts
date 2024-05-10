/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		let internalURL = (pathname: string) => {
			let url = new URL(new URL(req.url).origin);
			url.pathname = pathname;
			return url;
		};
		let reqPath = new URL(req.url).pathname;

		return reqPath == '/'
			? this.redirectResponse(false, internalURL('/contact'))
			: reqPath == '/contact'
			? this.redirectResponse(true, new URL('https://gravatar.com/timstrucken'))
			: new Response('Not found', { status: 404 });
	},

	redirectResponse(isPermanent: boolean, targetURL: URL) {
		return new Response(null, { status: isPermanent ? 301 : 302, headers: { location: targetURL.toString() } });
	},
};
