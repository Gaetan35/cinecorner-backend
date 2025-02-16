import { config } from '~config/defaultConfig';
import { loadConfig } from '..';
import { testConfig } from '~config/testConfig';

describe('loadConfig', () => {
  it('should return config when env is not test', () => {
    const result = loadConfig('production');
    expect(result).toEqual(config());
  });

  it('should return testConfig when env is test', () => {
    const result = loadConfig('test');
    expect(result).toEqual(testConfig());
  });
});
