describe('Creation of user and posts', () => {
  it('Should create a new user and posts', async () => {
    const data = {
      name: 'Léo',
      preferredName: 'Maralha',
      posts: [
        { name: 'p1', content: 'T1' },
        { name: 'p2', content: 'T3' },
        { name: 'p3', content: 'T3' },
      ],
    };

    const { status, body } = await global.testRequest
      .post('/test/create')
      .send(data);
    expect(status).toBe(200);
    expect(body).toHaveProperty('user');
  });
});
