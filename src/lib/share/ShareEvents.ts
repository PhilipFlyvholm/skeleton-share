export type ShareEvents = {
    'social-share': { provider: string };
    'clipboard-success': void;
    'clipboard-failed': void;
    'download-success': void;
    'close': void;
};