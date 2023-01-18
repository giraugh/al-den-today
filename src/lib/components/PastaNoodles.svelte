<script lang="ts">
	import { onMount } from 'svelte';

  let finishedCount = 0
  onMount(() => {
    // Setup animation continuation event
    document.querySelectorAll('.pasta-noodles svg path').forEach((noodlePath, _, noodles) => {
      noodlePath.addEventListener('animationend', () => {
        finishedCount += 1
        if (finishedCount >= noodles.length) {
          noodles.forEach(noodlePath => noodlePath.classList.toggle('sink'))
          finishedCount = 0
        }
      })
    })
  })
</script>

<style lang="scss">
  .pasta-noodles {
    background: red;
    width: 0;
    height: 0;
    position: relative;
  }

  svg {
    position: absolute;
    height: 38em;
    width: 30em;
    transform: translate(-20em, -31em) rotate(7deg);
  }

  svg path {
    stroke: var(--col-pasta);
    stroke-width: 54;
    stroke-dasharray: 5000px 5000px;
    animation: extend 2s forwards;
    stroke-dashoffset: -5000px;
    
    @for $i from 1 through 5 {
      &:nth-child(#{$i}) {
        transform: translate(#{$i * 6em}, #{$i * -3em});
        &.baby {
          animation-delay: #{$i * .2s};
        }
      }
    }

    &:global(.sink) {
      animation: sink 10s forwards linear;
      animation-delay: 0s !important;
    }
  }

  @keyframes extend {
    0% {
      opacity: 0;
      stroke: darken(#F4DC9D, 30%);
    }
    30% {
      opacity: 1;
    }
    100% {
      stroke-dashoffset: -13500px;
    }
  }

  @keyframes sink {
    0% {
      stroke-dashoffset: -13500px;
    }
    100% {
      stroke-dashoffset: -14000px;
    }
  }
</style>

<div class='pasta-noodles'>
  <svg viewBox="0 0 1872 2946" fill="none" xmlns="http://www.w3.org/2000/svg">
    {#each [1,2,3,4] as noodle}
      <path
        class="baby"
        d="M23 14.5L1178.3 1872.21C1197.2 1902.6 1225.15 1926.32 1258.21 1940.02L1327.45 1968.73C1461.9 2024.47 1587.71 1873.18 1508.39 1751.15V1751.15C1432.58 1634.52 1252.36 1677.23 1236.95 1815.47L1229.63 1881.18C1225.31 1919.93 1234.3 1959 1255.13 1991.96L1848.43 2931.14" />
    {/each}
  </svg>
</div>
