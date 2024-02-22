import { type Drawer, type DrawerStore } from '@skeletonlabs/skeleton';
const extraOffsetPercentage = 0.5;

let drawerStore:DrawerStore|undefined = undefined;
let initial = { x: 0, y: 0, height: 0 };
let drawer: HTMLElement | null = null;
let prev = 0;
let momentum = 0;

function handleMouseDown(e: CustomEvent<MouseEvent> | TouchEvent) {
    if(e instanceof MouseEvent && e.button !== 0) return;
    const drawerContent = document.querySelector('.drawer-content');
    if (drawerContent && drawerContent.contains(e.target as HTMLElement) && e.target !== drawerContent) return;
    drawer = document.querySelector('.drawer');
    if (!drawer) return;
    if (!(e instanceof TouchEvent)) e.preventDefault();
    const clientX = e instanceof TouchEvent ? e.touches[0].clientX : e.detail.clientX;
    const clientY = e instanceof TouchEvent ? e.touches[0].clientY : e.detail.clientY;
    initial = {
        x: clientX,
        y: clientY,
        height: drawer.getBoundingClientRect().height
    };
    drawer.style.transition = 'transform 0.1s ease-out';
    drawer.style.overflow = 'unset';
    drawer.style.transform = `translateY(0)`;
}

function handleMouseMove(e: MouseEvent | TouchEvent) {
    if (!drawer) return;
    const clientY = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
    let diff = initial.y - clientY;
    if (initial.y - clientY < 0) {
        drawer.style.transform = `translateY(${clientY - initial.y}px)`;
        drawer.style.height = `${initial.height}px`;
    } else {
        if (initial.y > window.innerHeight) window.innerHeight = initial.y;
        if (initial.y < 0) initial.y = 0;

        if (diff > 0) {
            //diff = (diff / (window.innerHeight - initial.height)) * initial.height * extraOffsetPercentage;
        }
        if (diff > initial.height * extraOffsetPercentage) {
            diff = initial.height * extraOffsetPercentage;
        }
        drawer.style.transform = `translateY(${-diff}px)`;
    }
    momentum = diff - prev;
    prev = diff;
}

function reset(){
    if(!drawer) return;
    drawer.style.transition = 'transform 0.3s ease-in-out';
    drawer.style.transform = `translateY(0)`;
    drawer = null;
    initial = { x: 0, y: 0, height: 0 };
}

function handleMouseUp(e: MouseEvent | TouchEvent) {
    if(e instanceof MouseEvent && e.button !== 0) return;
    if (!drawer) return;
    const target = e.target as HTMLElement;
    if(target && target.classList.contains('drawer-backdrop')) {
        reset()
        return;
    }
    e.preventDefault();
    
    const clientY = e instanceof TouchEvent ? e.changedTouches[0].clientY : e.clientY;
    const diff = initial.y - clientY;
    
    if (initial.height+diff < initial.height / 2 && (momentum < 0 || (initial.height+diff)*0.1 < initial.height / 2)) {
        if(drawerStore) drawerStore.close();
    } 
    reset();
}

function handleBackdrop(e: CustomEvent<MouseEvent>) {
    if (!drawer) return;
    
    e.preventDefault();
    setTimeout(() => {
        if(!drawer && drawerStore) drawerStore.close();
    }, 2);
}

function handleSelect(e: Event) {
    if (!drawer) return;
    e.preventDefault();
}
export function initDrawer(drawer: Drawer | undefined, drawerStoreInstance: DrawerStore) {
    if(!drawer) return;
    drawerStore = drawerStoreInstance;
    drawer.$on('drawer', handleMouseDown);
    drawer.$on('touchstart', handleMouseDown);
    drawer.$on('backdrop', handleBackdrop);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    window.addEventListener('selectstart', handleSelect);

}
