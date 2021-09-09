/* eslint-disable import/no-extraneous-dependencies */
import { RequestHandler, rest } from 'msw';
import { match } from 'node-match-path';

const apiUrl = process.env.REACT_APP_API_URL;
const authUrl = process.env.REACT_APP_AUTH_URL;

function ls(key: string, defaultVal: number | string) {
  const lsVal = window.localStorage.getItem(key);
  let val;
  if (lsVal) {
    val = Number(lsVal);
  }
  return Number.isFinite(val) ? val : defaultVal;
}

let sleep: () => Promise<void>;
if (process.env.NODE_ENV === 'test') {
  sleep = () => Promise.resolve();
} else {
  sleep = (
    t = Math.random() *
      ls('__react_app_variable_request_time__', 400) +
      ls('__react_app_min_request_time__', 400),
  ) => new Promise((resolve) => setTimeout(resolve, t));
}

function requestMatchesFailConfig(req) {
  function configMatches({ requestMethod, urlMatch }) {
    return (
      (requestMethod === 'ALL' || req.method === requestMethod) &&
      match(urlMatch, req.url.pathname).matches
    );
  }
  try {
    const failConfig = JSON.parse(
      window.localStorage.getItem(
        '__react_app_request_fail_config__',
      ) || '[]',
    );
    if (failConfig.some(configMatches)) return true;
  } catch (error) {
    window.localStorage.removeItem(
      '__react_app_request_fail_config__',
    );
  }
  return false;
}

function shouldFail(req) {
  if (JSON.stringify(req.body)?.includes('FAIL')) return true;
  if (req.url.searchParams.toString()?.includes('FAIL')) return true;
  if (process.env.NODE_ENV === 'test') return false;
  const failureRate = Number(
    window.localStorage.getItem('__react_app_failure_rate__') || 0,
  );
  if (Math.random() < failureRate) return true;
  if (requestMatchesFailConfig(req)) return true;

  return false;
}

const getToken = (req) =>
  req.headers.get('Authorization')?.replace('Bearer ', '');

const handlers = [
  // EXAMPLE test
  rest.post(`${authUrl}/login`, async (req, res, ctx) => {
    await sleep;
    return res(ctx.json({ user: 'test' }));
  }),
].map((handler: any) => {
  const originalResolver = handler.resolver;
  // eslint-disable-next-line no-param-reassign
  handler.resolver = async function resolver(req, res, ctx) {
    try {
      if (shouldFail(req)) {
        throw new Error('Request failure (for testing purposes).');
      }
      const result = await originalResolver(req, res, ctx);
      return result;
    } catch (error: any) {
      const status = error.status || 500;
      // eslint-disable-next-line @typescript-eslint/return-await
      return await res(
        ctx.status(status),
        ctx.json({
          status,
          message: error.message || 'Unknown Error',
        }),
      );
    } finally {
      await sleep();
    }
  };
  return handler;
});

export { handlers };
