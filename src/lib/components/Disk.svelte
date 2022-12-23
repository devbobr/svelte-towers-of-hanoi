<script lang="ts">
	import { selectedDisk } from '../../stores';
	import { createEventDispatcher } from 'svelte';

	export let size: number;

	const dispatch = createEventDispatcher();

	const onDiskClicked = () => {
		if ($selectedDisk && $selectedDisk.disk.size === size) {
			// We are alread selected, so deselect myself
			$selectedDisk = null;
		} else if ($selectedDisk) {
			return;
		} else {
			// We are not selected, so we inform the tower
			// which has to decide if we can be selected
			dispatch('selected');
		}
	};
</script>

<div
	class:selected={$selectedDisk?.disk.size === size}
	style={`width: ${size * 3.2}rem`}
	class="select-none w-36 h-6 bg-teal-400"
	on:pointerup={onDiskClicked}
/>

<style>
	.selected {
		@apply border-2 border-green-600;
	}
</style>
