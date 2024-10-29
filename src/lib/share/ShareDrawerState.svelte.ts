export type ShareDrawerState =
    | {
        open: true;
        meta: ShareDrawerData;
    }
    | {
        open: false;
        meta: null;
    };

export type ShareDrawerData = {
    title: string;
    url: string;
    clipboardMessage?: string;
    text?: string;
    files?: File[];
};

export const shareDrawerState = $state<ShareDrawerState>({ open: false, meta: null });


export function openShareDrawer(meta: ShareDrawerData) {
    shareDrawerState.open = true
    shareDrawerState.meta = meta;
}

export function closeShareDrawer() {
    shareDrawerState.open = false;
    shareDrawerState.meta = null;
}