<script lang="ts">
	import { onMount } from 'svelte';
	let cells = {}

	const colors = [
		null,
		[0, 0, 0],
		[255, 0, 0],
		[233, 30, 99],
		[156, 39, 176],
		[103, 58, 183],
		[63, 81, 181],
		[33, 150, 243],
		[3, 169, 244],
		[0, 188, 212],
		[0, 150, 136],
		[76, 175, 80],
		[139, 195, 74],
		[205, 220, 57],
		[158, 224, 122],
		[255, 235, 59],
		[255, 193, 7],
		[255, 152, 0],
		[255, 205, 210],
		[255, 87, 34],
		[121, 85, 72],
	];

	let currentColor = [255,0,11];

	function paint(cellId, e: MouseEvent | TouchEvent) {
		const shouldPaint = e.type == 'touchmove' || (e && e.buttons && e.buttons == 1 || e.buttons == 3);
		if(!shouldPaint || cells[cellId] === currentColor) {
			return;
		}

		if(gun) {
			const el = {}
			el[cellId] = currentColor.join(',');
			gun.get('pixelsCanvas_').put(el);
		}
		cells[cellId] = currentColor;
	}

	let gun;

	onMount(() => {

		gun = window.Gun(['https://gun-manhattan.herokuapp.com/gun']);
		
		gun.get('pixelsCanvas_').map().on((value, name) => {
			try {
				cells[name] = value.split(',').map(v => parseInt(v));
			} catch(e) {
				console.log(e);
			}
		})

		/*
 		gun.get('pixels').map().on(function(color,cellid){
			if (cellid && color && typeof color == 'string') {
				console.log(cellid, color);
			 	cells[cellid] = color.split(',');
			}
			//console.log({cellid, color})
		});
		*/

  // copy = gun.get('test').get('paste');
  // paste.oninput = () => { copy.put(paste.value) };
  // copy.on((data) => { paste.value = data });
	})

</script>

<svelte:head>
	<title>Home</title>
	<script src="https://cdn.jsdelivr.net/npm/gun/gun.js"></script>
</svelte:head>

<section>
<div class="flex flex-col mb-10 justify-center">
	<div>PICK COLOR</div>
	<div class="flex flex-wrap">
		{#each colors as c}
			<div class="flex w-9 h-9" class:bg-slate-500={c} style="{c ? `background: rgb(${c[0]}, ${c[1]}, ${c[2]}` : ''}"
			on:click={() => { currentColor = c}}
			on:touchstart={() => { currentColor = c}}
			on:mousedown={() => { currentColor = c}}>
			</div>
		{/each}
	</div>
</div>

<div class="w-full bg-slate-400 pixel-art-container">
{#each Array(20) as _, i}
    {#each Array(20) as _, j}
			{@const cellId = `${i}-${j}`}
			{@const cell = cells[cellId]}
  		<div class="cell bg-slate-500"
			style="background: rgb({cell ? `${cell[0]}, ${cell[1]}, ${cell[2]}` : '100,116,139'})"
		 on:mousedown={(e) => { paint(cellId, e) }}
		 on:click={(e) => { paint(cellId, e) }}
		 on:touchstart={(e) => { paint(cellId, e) }}
		 on:touchmove={(e) => { paint(cellId, e) }}
		 on:mouseenter={(e) => { paint(cellId, e) }}
		 on:mouseleave={(e) => { paint(cellId, e) }}
		 ></div>  
		{/each}
{/each}
	
</div>

</section>

<style>
	.pixel-art-container {
		width: 400px;
		height: 400px;
		display: grid;
		grid-template-columns: repeat(20, 1fr);
		grid-template-rows: repeat(20, 1fr);
		grid-column-gap:1px;
		grid-row-gap: 1px;
    cursor: cell;
    touch-action: none;
	}

	.cell {
		cursor: cell;
    touch-action: none;
	}
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}
</style>
