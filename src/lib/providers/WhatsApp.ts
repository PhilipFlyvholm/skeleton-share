import type { ShareProvider } from "./index.js";
import WhatsAppImage from '$lib/assets/whatsapp.webp';
const WhatsAppProvider: ShareProvider = {
    name: 'WhatsApp',
    icon: 'tabler:brand-whatsapp',
    image: WhatsAppImage,
    getShareUrl: (shareData) => {
        const message = shareData.text || shareData.title;
        const url = new URL(shareData.url);
        const text = encodeURIComponent(message + " Try to beat me at: "+ url.toString());
        const shareUrl = `https://wa.me/?text=${text}`
        return shareUrl;
    }
};

export default WhatsAppProvider;