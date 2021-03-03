declare namespace NodeJS {
  interface Global {
    testRequest: import('supertest').SuperTest<import('supertest').Test>;
  }
}

declare module 'sequelize-log-syntax-colors' {
  function sequelizeLogSyntaxColors (text: string): string;
  export = sequelizeLogSyntaxColors;
}