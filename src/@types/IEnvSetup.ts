export interface IEnvSetup {
  init(config: any): Promise<void>;
  shutdown(reason: any): void;
}
