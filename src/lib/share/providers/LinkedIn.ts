import type { ShareProvider } from "./index.js";
const LinkedInProvider: ShareProvider = {
    name: 'LinkedIn',
    icon: 'tabler:brand-linkedin',
    getShareUrl: (shareData) => {
        const text = shareData.text || shareData.title;
        const url = new URL(shareData.url);
        url.searchParams.append("title", text)
        const urlEncoded = encodeURIComponent(url.toString());
        const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${urlEncoded}`
        return shareUrl;
    }
};

export default LinkedInProvider;