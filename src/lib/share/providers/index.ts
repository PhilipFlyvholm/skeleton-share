import type { ShareDrawerData } from "../ShareDrawerSettings.js";
import EmailProvider from "./Email.js";
import FacebookProvider from "./Facebook.js";
import LinkedInProvider from "./LinkedIn.js";
import MessengerProvider from "./Messenger.js";
import WhatsAppProvider from "./WhatsApp.js";
import XProvider from "./X.js";

export interface ShareProvider {
    getShareUrl: (shareData: ShareDrawerData, providerData?: unknown) => string;
    name: string;
    icon: string;
}

export const shareProviders: ShareProvider[] = [FacebookProvider, MessengerProvider(""), XProvider, WhatsAppProvider, LinkedInProvider, EmailProvider];