<script lang="ts">
	import Tower from '$lib/components/Tower.svelte';
	import { onMount } from 'svelte';
	import { towers, numDisks, resetTowers } from '../stores';

	onMount(() => {
		// Initialize the game
		resetTowers();
	});

	const resetGame = () => {
		resetTowers();
	};

	$: won = $towers.length === 3 && $towers[2].disks.length === $numDisks;

	// $: console.log(':: won?', won ? 'yes' : 'no');
</script>

<h1 class="text-center text-4xl my-12">Towers Of Hanoi</h1>

<div class="tower-container m-12 flex justify-around border-b-4 border-gray-800">
	<Tower myPos={1} />
	<Tower myPos={2} />
	<Tower myPos={3} />
</div>

{#if won}
	<div on:pointerup={resetGame} class="select-none text-6xl text-sky-600 text-center mt-12">
		Congratulations, you have won :)
	</div>
{/if}
