const test = require('node:test');
const assert = require('node:assert/strict');
const app = require('../src/app');

async function requestJson(path, options = {}) {
  const server = app.listen(0);
  try {
    const address = server.address();
    const response = await fetch(`http://127.0.0.1:${address.port}${path}`, options);
    const text = await response.text();
    return { status: response.status, text };
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

test('POST /api/review should accept code and return review content', async () => {
  const result = await requestJson('/api/review', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code: 'const value = 1;\nconsole.log(value);',
      issue: 'Check for basic code quality.'
    })
  });

  assert.equal(result.status, 200);
  assert.match(result.text, /review|summary|analysis|code/i);
});
