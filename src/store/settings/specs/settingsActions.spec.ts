import { settingsActions } from '../settingsActions';
import { settingsSlice } from '../settingsSlice';
import { SettingsService } from '../settingsService';

jest.mock('@/i18n', () => ({
  t: (key: string) => key,
}));

jest.mock('@/utils/toastUtils', () => ({
  showToast: jest.fn(),
}));

jest.mock('@/utils/navigationUtils', () => ({
  navigate: jest.fn(),
}));

jest.mock('../settingsService', () => ({
  SettingsService: {
    verifyInstallationUrl: jest.fn(),
  },
}));

describe('settings', () => {
  it('points a fresh install at inbox.4ys.org', () => {
    const state = settingsSlice.reducer(undefined, { type: 'INIT' });
    expect(state.baseUrl).toBe('inbox.4ys.org');
    expect(state.installationUrl).toBe('https://inbox.4ys.org/');
    expect(state.webSocketUrl).toBe('wss://inbox.4ys.org/cable');
  });

  describe('setInstallationUrl', () => {
    const run = (url: string) => settingsActions.setInstallationUrl(url)(jest.fn(), jest.fn(), {});

    beforeEach(() => {
      (SettingsService.verifyInstallationUrl as jest.Mock).mockResolvedValue(true);
    });

    it('accepts a bare host', async () => {
      const result = await run('chat.example.com');
      expect(result.payload).toEqual({
        installationUrl: 'https://chat.example.com/',
        webSocketUrl: 'wss://chat.example.com/cable',
        baseUrl: 'chat.example.com',
      });
    });

    it('builds the socket URL from the host when a scheme is typed', async () => {
      const result = await run('https://chat.example.com');
      expect(result.payload).toEqual({
        installationUrl: 'https://chat.example.com/',
        webSocketUrl: 'wss://chat.example.com/cable',
        baseUrl: 'chat.example.com',
      });
    });
  });
});
