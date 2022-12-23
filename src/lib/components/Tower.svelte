<script lang="ts">
	import { towers, selectedDisk } from '../../stores';
	import Disk from './Disk.svelte';

	export let myPos: number;

	const onTowerSelected = () => {
		if ($selectedDisk && $selectedDisk.tower.pos !== myPos) {
			// console.log('tower clicked', myPos);

			// TODO: Check if we can move the disk to this tower
			const disk = $selectedDisk.disk;

			// My own top disk must be bigger than the disk we want to move
			if (myself.disks.length > 0 && myself.disks[0].size < disk.size) {
				return;
			}

			// We are fine, so we can move the disk
			const t = [...$towers];

			// Remove the disk from the old tower
			const oldTower = $selectedDisk.tower;
			oldTower.disks = oldTower.disks.filter((d) => d.size !== disk.size);

			// Add the disk to the new tower
			myself.disks = [disk, ...myself.disks];

			// Update the store
			$towers = t;

			// Deselect the disk
			$selectedDisk = null;
		}
	};

	const onDiskSelection = () => {
		// console.log('tower clicked', myPos);

		const topDisk = myself.disks.length > 0 ? myself.disks[0] : null;
		if (topDisk) {
			$selectedDisk = { disk: topDisk, tower: myself };
		}
	};

	$: myself = $towers[myPos - 1];

	// My own top disk must be bigger than the disk we want to move
	$: unselectable =
		$selectedDisk && myself.disks.length > 0 && myself.disks[0].size < $selectedDisk.disk.size;

	// No selection of the tower, if the selected disk is from this tower
	$: selectable = $selectedDisk && !($selectedDisk.tower === myself);

	// $: console.log(selectable, unselectable);
</script>

<div
	on:pointerup={onTowerSelected}
	class:selectable
	class:unselectable
	class="relative w-72 h-36 border-dashed border-2 border-transparent flex justify-center"
>
	<div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-full bg-sky-300" />
	<div class="flex flex-col items-center gap-1 absolute bottom-0">
		{#if myself && myself.disks.length !== 0}
			{#each myself.disks as disk}
				<Disk size={disk.size} on:selected={onDiskSelection} />
			{/each}
		{/if}
	</div>
</div>

<style>
	.selectable:hover {
		@apply border-green-700;
	}

	.unselectable:hover {
		@apply border-red-700;
	}
</style>
