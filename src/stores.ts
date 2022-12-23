import { writable } from 'svelte/store';

export interface Disk {
    size: number;
}

export interface Tower {
    pos: number;
    disks: Disk[];
}

export interface Selection {
    tower: Tower;
    disk: Disk;
}

const NUM_DISKS = 3;

export const numDisks = writable<number>(NUM_DISKS);
export const towers = writable<Tower[]>([]);
export const selectedDisk = writable<Selection | null>(null);

export const resetTowers = () => {
    const diskSet = [];

    for (let i = 1; i <= NUM_DISKS; i++) {
        diskSet.push({ size: i });
    }

    towers.set([{ pos: 1, disks: diskSet }, { pos: 2, disks: [] }, { pos: 3, disks: [] }]);
    selectedDisk.set(null);
};
