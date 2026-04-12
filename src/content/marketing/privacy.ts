import type { MarketingPageSpec } from '@/types/contracts'

const EFFECTIVE_DATE = 'April 12, 2026'

export const privacySpec: MarketingPageSpec = {
  id: 'privacy',
  route: '/privacy',
  title: 'Privacy Policy — Tub Companion',
  description:
    'Privacy policy for the Tub Companion iOS app, an audience companion for the art installation THE TUB by Sebastian Suarez-Solis.',
  blocks: [
    {
      id: 'hero',
      type: 'hero',
      variant: 'compact',
      eyebrow: 'Privacy Policy',
      headline: 'Tub Companion Privacy Policy',
      subheadline: `This policy explains what the Tub Companion iOS app does and does not collect. It is written by the developer, Sebastian Suarez-Solis, and applies to the app published on the App Store under the bundle identifier com.StageDevices.TubCompanion. Effective ${EFFECTIVE_DATE}.`,
      actions: [],
    },
    {
      id: 'summary',
      type: 'prose',
      eyebrow: 'Summary',
      title: 'In one paragraph',
      body: 'Tub Companion is a free iOS app that lets gallery visitors interact with THE TUB, a physical sound installation. The app does not require an account, does not collect personal information, does not use analytics or advertising SDKs, and does not transmit any data to a server controlled by the developer. All network activity is between your device and a piece of installation hardware on the same local Wi-Fi network. The only data the app stores is created on your device and stays on your device.',
    },
    {
      id: 'identity',
      type: 'prose',
      eyebrow: 'Section 1',
      title: 'Who is responsible for this app',
      body: 'Tub Companion is developed and published by Sebastian Suarez-Solis, an individual developer based in the United States. The publisher name on the App Store listing is StageDevices, which is the trade name used for App Store distribution.\n\nFor any privacy-related question, request, or complaint covered by this policy, contact Sebastian Suarez-Solis at contact@cbassuarez.com. You may also use the same address for general support questions, which are described on the support page.',
    },
    {
      id: 'no-collection',
      type: 'prose',
      eyebrow: 'Section 2',
      title: 'Data the app does not collect',
      body: 'The Tub Companion app does not collect, transmit, or store any of the following on a server:\n\n• Name, email address, phone number, postal address, or any other contact information.\n• Account credentials. The app has no login system and no concept of an account.\n• Device identifiers used for tracking, advertising identifiers (IDFA), or cross-app or cross-site tracking signals.\n• Location information. The app does not request location permission and does not access GPS, Wi-Fi geolocation, or coarse-location services.\n• Contacts, photos, calendar, health, motion, or any other data from system permission categories the app does not request.\n• Crash reports, performance traces, telemetry, or analytics events. The app does not bundle Firebase, Sentry, Crashlytics, Amplitude, Mixpanel, Segment, TelemetryDeck, PostHog, Google Analytics, or any other third-party analytics, attribution, or advertising SDK.\n\nThere is no developer-controlled backend. The app does not communicate with any server operated by Sebastian Suarez-Solis or StageDevices.',
    },
    {
      id: 'permissions',
      type: 'prose',
      eyebrow: 'Section 3',
      title: 'iOS permissions the app may request',
      body: 'The app may prompt for the following iOS permissions. Each prompt explains the purpose at the moment it appears, and you can deny or revoke any of them in the iOS Settings app at any time. Denying a permission does not affect any other part of the app beyond the feature it powers.\n\n• Local Network. Required so the app can discover and connect to the THE TUB installation hardware on the same Wi-Fi network you are joined to at the venue. No data leaves the local network as a result of this connection. The hardware does not relay your data to the internet.\n\n• Microphone. May be requested when a session routes live audio between your device and the installation. When granted, audio is processed in memory on your device for the duration of the session and is not written to a file on your device, not transmitted to any server controlled by the developer, and not retained after the session ends.\n\n• Speech Recognition. Declared for compatibility with optional voice features. If a future update activates this feature, any speech audio will be handled by the on-device or Apple-hosted speech recognition service that Apple provides as part of iOS, subject to Apple\'s own privacy terms. The developer does not receive a copy of recognized speech.\n\nThe app does not request location, contacts, photos, camera, calendar, reminders, health, motion, Bluetooth, or push notification permissions.',
    },
    {
      id: 'on-device',
      type: 'prose',
      eyebrow: 'Section 4',
      title: 'Data the app stores on your device',
      body: 'A small amount of data is created and stored locally on your device so the app can remember your preferences and resume where you left off. This includes the last harness host and port used, simple session state and progress markers for the in-app orientation, and a local Core Data store used for app-internal bookkeeping.\n\nThis on-device data is not synchronized to iCloud, is not backed up to any developer server, and is not accessible to anyone other than you. It is removed when you delete the app from your device. If you want to clear it without deleting the app, use the reset controls in Settings inside the app, then quit and relaunch.',
    },
    {
      id: 'installation-network',
      type: 'prose',
      eyebrow: 'Section 5',
      title: 'What happens when you connect to THE TUB',
      body: 'When you visit a venue exhibiting THE TUB and use Tub Companion, the app communicates over the local Wi-Fi network with installation hardware physically present at that venue. This communication carries the inputs you make in the app — for example, taps on the play grid or movements on the steer pad — and audio routed through the app for the purpose of the artwork.\n\nThe installation hardware processes those signals locally to drive the live audiovisual output of the piece. The artist may, as part of operating the artwork, retain anonymous session traces (timestamps, parameter values, anonymized input events) on the installation\'s own equipment for the purpose of improving and maintaining the work. Those traces are not personal data, are not linked to your Apple ID or device identifier, and are governed by the venue and the artist, not by the Tub Companion app. If a specific exhibition retains additional session data, that exhibition will display its own visitor notice at the venue.',
    },
    {
      id: 'sharing',
      type: 'prose',
      eyebrow: 'Section 6',
      title: 'Sharing and sale of data',
      body: 'The Tub Companion app does not share, sell, rent, license, trade, or otherwise transfer data to advertisers, data brokers, or any other third party. There is nothing to share, because the app does not collect data for the developer in the first place.\n\nThe developer does not engage in any practice that would qualify as a "sale" or "share" of personal information under the California Consumer Privacy Act (CCPA), and does not perform targeted advertising or cross-context behavioral advertising of any kind.',
    },
    {
      id: 'children',
      type: 'prose',
      eyebrow: 'Section 7',
      title: 'Children',
      body: 'Tub Companion is intended for general audiences attending an art installation in a gallery setting. It is not directed to children under the age of 13, and the developer does not knowingly collect personal information from children. Because the app does not collect personal information from anyone, it does not collect personal information from children either. If you believe a child has somehow provided personal information through the app, contact the developer at contact@cbassuarez.com and any such information that may have been received will be deleted.',
    },
    {
      id: 'rights',
      type: 'prose',
      eyebrow: 'Section 8',
      title: 'Your rights',
      body: 'Depending on where you live, you may have legal rights with respect to personal information about you, including the right to access, correct, delete, or port that information, and the right to object to or restrict its processing. Because the developer does not collect personal information through the Tub Companion app, there is no personal information for the developer to access, correct, delete, or port.\n\nIf you would like to confirm in writing that the developer holds no personal information about you in connection with the app, send a request to contact@cbassuarez.com and you will receive a written response.',
    },
    {
      id: 'changes',
      type: 'prose',
      eyebrow: 'Section 9',
      title: 'Changes to this policy',
      body: `If this policy changes in a way that affects what the app collects, the updated policy will be published at this same URL with a new effective date. Material changes will also be reflected in the App Store listing on the next app update. The current effective date is ${EFFECTIVE_DATE}.`,
    },
    {
      id: 'contact',
      type: 'prose',
      eyebrow: 'Section 10',
      title: 'Contact',
      body: 'Privacy questions, complaints, and rights requests:\nSebastian Suarez-Solis\nEmail: contact@cbassuarez.com\n\nIf you are contacting about a specific exhibition of THE TUB, please include the venue and approximate date of your visit so the developer can route your question appropriately.',
    },
    {
      id: 'cta',
      type: 'cta',
      variant: 'light',
      headline: 'Need help with the app instead?',
      actions: [
        { id: 'support', label: 'Visit the support page', kind: 'route', target: '/support' },
      ],
    },
  ],
}
