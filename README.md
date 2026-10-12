<img src="https://user-images.githubusercontent.com/2246121/282256557-1570674b-d142-4198-9740-69404cc6a339.png#gh-light-mode-only" width="100%" alt="Chat dashboard dark mode"/>
<img src="https://user-images.githubusercontent.com/2246121/282256632-87f6a01b-6467-4e0e-8a93-7bbf66d03a17.png#gh-dark-mode-only" width="100%" alt="Chat dashboard"/>

---

# Midnight

This fork ships the Chatwoot mobile app as **Midnight** (`org.fourys.midnight`), the inbox for
4Ys's Midnight Ai. What differs from upstream:

- **Server.** Defaults to `https://inbox.4ys.org`. *Change URL* on the login screen still
  points the app at any other Chatwoot server.
- **Attachments up to 100 MB.** The server has to accept them too: raise Chatwoot's
  attachment limit and the reverse proxy's body limit (e.g. nginx `client_max_body_size`).
  WhatsApp still caps images at 5 MB and video and audio at 16 MB.
- **Day and Night.** *Settings › Appearance* (or the phone's setting). Day is the app as it
  was, in the 4Ys palette: ink on paper. Night is midnight.os from 4ys.org/midnight: lit
  windows on a dotted desk, the terminal face, square corners.
- **Midnight controls.** The button beside the reply field hands a conversation back to the
  Midnight agent (status pending) or takes it over (open, assigned to you). It replaces
  Chatwoot's Captain copilot.

To build your own with EAS:

- **Not Expo Go.** The app uses native modules Expo Go doesn't have (Firebase, notifee,
  ffmpeg), so it runs as a development build (`eas build --profile development`, or
  `npx expo run:ios` / `run:android` locally) or an installable test build
  (`eas build --profile preview`).
- **Set** `EXPO_PUBLIC_PROJECT_ID` and `EXPO_PUBLIC_EAS_OWNER`.
- **Firebase is required.** Add `google-services.json` and `GoogleService-Info.plist` for
  `org.fourys.midnight` and point `EXPO_PUBLIC_ANDROID_GOOGLE_SERVICES_FILE` and
  `EXPO_PUBLIC_IOS_GOOGLE_SERVICES_FILE` at them. Prebuild stops without them.
- **Sentry.** Release builds upload source maps to Sentry. Set `SENTRY_AUTH_TOKEN`,
  `EXPO_PUBLIC_SENTRY_ORG_NAME` and `EXPO_PUBLIC_SENTRY_PROJECT_NAME`, or set
  `SENTRY_DISABLE_AUTO_UPLOAD=true` in the EAS environment; otherwise the build fails.
- **Universal links.** The server must serve the app-site association for
  `org.fourys.midnight`.

---

# Chatwoot

Mobile app for chatwoot platform. Built with React Native and Expo.

<p>
   <a href="https://github.com/react-native-community/releases/blob/master/CHANGELOG.md"><img src="https://img.shields.io/github/package-json/dependency-version/chatwoot/chatwoot-mobile-app/react-native?color=%2361dafb" alt="Project Dependencies"></a>
   <img src="https://img.shields.io/github/package-json/dependency-version/chatwoot/chatwoot-mobile-app/expo?color=%2361dafb" alt="Expo">
  <img src="https://img.shields.io/discord/647412545203994635" alt="Discord">
  <a href="https://discord.gg/cJXdrwS"><img src="https://img.shields.io/badge/chat-Discord-violet?logo=discord" alt="Chat on Discord"></a>
   <a href="http://makeapullrequest.com"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="Chat on Discord"></a>
 <img src="https://img.shields.io/github/license/chatwoot/chatwoot-mobile-app" alt="License">
</p>

- **Supported Chatwoot version:** 3.13.0+
- **Supported iOS versions**: 13.4+
- **Supported Android versions**: 6.0+

## Features

- Do not miss out on the new customers
- Follow up on customer conversations on go
- Reply easily with canned responses
- Receive realtime notifications about system activities
- Communicate with other team members via private notes
- Assign statuses to your conversations
  ... and more to come!

## Download Android/iOS application

<p >
  <a href="https://apps.apple.com/app/id1495796682">
    <img alt="Download on the App Store" title="App Store" src="http://i.imgur.com/0n2zqHD.png" width="140">
  </a>

  <a href="https://play.google.com/store/apps/details?id=com.chatwoot.app&hl=en">
    <img alt="Get it on Google Play" title="Google Play" src="http://i.imgur.com/mtGRPuM.png" width="140">
  </a>
</p>

## Testing

To help with testing app updates before they're released, you can:

Sign up to be a beta tester

- [Android](https://play.google.com/apps/testing/com.chatwoot.app) - Open this link from your Android device
- [iOS](https://testflight.apple.com/join/yQ4yoSx4) - Open this link from your iOS device

You can leave the Beta testing program at any time:

- On Android, [click this link](https://play.google.com/apps/testing/com.chatwoot.app) while logged in with your Google Play email address used to opt-in for the Beta program, then click **Leave the program**.
- On iOS, access the `Chatwoot` app page in TestFlight and click **Stop Testing**.

## Feedback & Contributing

Feel free to send us feedback on [X](https://x.com/chatwootapp) or [file an issue](https://github.com/chatwoot/chatwoot-mobile-app/issues).

If you wish to contribute, please take a quick look at the [CONTRIBUTING.md](https://www.chatwoot.com/docs/contributing-guide/mobile-app/setup-guide).

If there's anything you'd like to chat about, please feel free to join our [Discord](https://discord.gg/cJXdrwS) chat!

_Chatwoot_ &copy; 2017-2025, Chatwoot Inc - Released under the MIT License.
