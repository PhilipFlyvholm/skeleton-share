import type { ShareDrawerData } from '../share/ShareDrawerSettings.js';
export interface ShareProvider {
	getShareUrl: (shareData: ShareDrawerData, providerData?: unknown) => string;
	name: string;
	icon: string;
	image?: string;
}

export { default as FacebookProvider } from './Facebook.js';
export { default as MessengerProvider } from './Messenger.js';
export { default as XProvider } from './X.js';
export { default as EmailProvider } from './Email.js';
export { default as WhatsAppProvider } from './WhatsApp.js';
export { default as LinkedInProvider } from './LinkedIn.js';
