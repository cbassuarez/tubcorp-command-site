import type { MarketingPageSpec } from '@/types/contracts'

export const supportSpec: MarketingPageSpec = {
  id: 'support',
  route: '/support',
  title: 'Support — Tub Companion',
  description:
    'Support page for the Tub Companion iOS app, including troubleshooting steps and how to contact the developer.',
  blocks: [
    {
      id: 'hero',
      type: 'hero',
      variant: 'compact',
      eyebrow: 'Support',
      headline: 'Tub Companion Support',
      subheadline:
        'Tub Companion is a free iOS app that lets you interact with THE TUB, a physical sound installation by Sebastian Suarez-Solis. This page covers what the app needs to work, what to try if something is off, and how to reach the developer directly.',
      actions: [],
    },
    {
      id: 'contact',
      type: 'prose',
      eyebrow: 'Direct contact',
      title: 'Reach the developer',
      body: 'For any question, bug report, or feedback about the Tub Companion app, email Sebastian Suarez-Solis at contact@cbassuarez.com. The developer reads every message personally. Replies typically arrive within a few business days. There is no ticketing system, no chatbot, and no phone line — just email.\n\nWhen reporting a problem, it helps to include your iPhone or iPad model, your iOS version, the app version (visible in the app\'s Settings tab), the venue where you encountered the issue, and a short description of what you were trying to do.',
    },
    {
      id: 'requirements',
      type: 'prose',
      eyebrow: 'What you need',
      title: 'Requirements',
      body: 'Tub Companion is designed to be used on-site at a venue exhibiting THE TUB. To get the full experience you need:\n\n• An iPhone or iPad running a current version of iOS or iPadOS.\n• To be physically present at a venue showing THE TUB, joined to the venue\'s local Wi-Fi network so the app can find the installation hardware.\n• To grant the Local Network permission when prompted, so the app can discover the on-site hardware.\n• Optionally, to grant the Microphone permission if a session asks for it. You can use the orientation and reading sections of the app without granting it.\n\nAway from a venue, you can still install the app, read the orientation manual, and explore the interface, but live features that depend on the installation will be unavailable.',
    },
    {
      id: 'troubleshooting',
      type: 'prose',
      eyebrow: 'If something is off',
      title: 'Troubleshooting',
      body: 'The app cannot find the installation. Confirm you are joined to the venue\'s Wi-Fi network and not your phone\'s cellular data. If the venue posts a specific network name, switch to it. Then open the app, go to Settings, and use the reconnect control. If iOS previously denied Local Network access, open the iOS Settings app, find Tub Companion, and enable Local Network.\n\nThe play grid does not produce sound at the installation. Confirm the cable or audio handoff prompted by the app is in place. The status chip on the Play tab will show CONNECTED when the route is healthy. If it stays MISSING, unplug and replug the cable, or ask a venue attendant for help — the issue may be on the installation side rather than the app.\n\nThe app feels stuck on the boot screen. The boot sequence runs until the play surface is ready. If it does not complete, force-quit the app (swipe up from the bottom and flick the app away on iPhone, or use the App Switcher on iPad) and reopen it. If the problem repeats, restart the device and try again.\n\nA permission prompt was dismissed by mistake. Open the iOS Settings app, scroll to Tub Companion, and toggle the relevant permission (Local Network, Microphone) on or off as needed. The next time you open the app it will pick up the new setting.\n\nThe app crashes or behaves unexpectedly. Email contact@cbassuarez.com with the details listed above and a description of what you were doing when it happened. The app does not send crash reports automatically, so a direct report from you is the only way the developer learns about the issue.',
    },
    {
      id: 'privacy-pointer',
      type: 'prose',
      eyebrow: 'Privacy',
      title: 'How your data is handled',
      body: 'Tub Companion does not require an account, does not collect personal information, does not use analytics, and does not transmit data to a developer-operated server. All network activity is between your device and the on-site installation hardware on the same local Wi-Fi network. For full details, see the privacy policy.',
    },
    {
      id: 'about',
      type: 'prose',
      eyebrow: 'About the work',
      title: 'About THE TUB',
      body: 'THE TUB is a physical, walk-in sound installation by Sebastian Suarez-Solis. The Tub Companion app is the audience-side companion piece — it gives visitors a way to play sounds into the room, steer the live behavior of the work, and read a short orientation that explains what they are inside of. It is distributed for free on the App Store as part of the artwork. There is no paid tier and no in-app purchase.',
    },
    {
      id: 'cta',
      type: 'cta',
      variant: 'light',
      headline: 'Still stuck? Email the developer.',
      actions: [
        { id: 'mail', label: 'contact@cbassuarez.com', kind: 'external', target: 'mailto:contact@cbassuarez.com' },
        { id: 'privacy', label: 'Read the privacy policy', kind: 'route', target: '/privacy' },
      ],
    },
  ],
}
