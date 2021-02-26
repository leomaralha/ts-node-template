describe('Teste geral', () => {
  it('should get home', async () => {
    const { status } = await global.testRequest.get('/test');
    expect(status).toBe(200);
  });
});
