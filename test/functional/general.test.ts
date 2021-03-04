describe('Teste geral', () => {
  it('should get test page', async () => {
    const { status } = await global.testRequest.get('/test');
    expect(status).toBe(200);
  });
});
