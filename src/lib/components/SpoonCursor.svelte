<script lang="ts">
	import { onMount } from 'svelte'

  let mouseX: number
  let mouseY: number

  onMount(() => {
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX
      mouseY = e.clientY
    })
    
    window.addEventListener('focus', () => {
      document.body.classList.add('hide-cursor')
    })

    window.addEventListener('blur', () => {
      document.body.classList.remove('hide-cursor')
    })
  })
</script>

<style lang="scss">
  .spoon-cursor-container {
    position: fixed;
    overflow: hidden;
    z-index: 100;
    inset: 0;
    pointer-events: none;
  }

  .spoon-cursor {
    pointer-events: none;
    position: absolute;
    transform: translate(-43%, -43%) scale(.3);
    z-index: 100;

    @media (hover: none) {
      display: none;
    }
  }
</style>

<div class="spoon-cursor-container">
  <div class="spoon-cursor" style="left: {mouseX}px; top: {mouseY}px;">
    <svg width="500" height="500" viewBox="0 0 647 647" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M273.094 169.056L281.591 212.169C286.465 236.899 296.958 260.178 312.258 280.209L341.75 318.818C358.544 340.804 377.427 361.113 398.135 379.46L576.691 537.658C586.905 546.707 587.382 562.493 577.733 572.142C568.489 581.386 553.503 581.395 544.248 572.162L344.5 372.875L283.134 319.664C264.391 303.412 242.449 291.269 218.725 284.018L160.941 266.357C128.004 256.291 104.248 227.545 100.567 193.302C93.7934 130.283 155.197 81.835 214.911 103.084L216.754 103.74C245.738 114.054 267.146 138.873 273.094 169.056Z" fill="#BF7E41"/>
      <path d="M258.036 169.563L261.948 189.12C265.471 206.734 261.11 225.007 250.012 239.132C234.087 259.4 207.204 267.574 182.692 259.6L161.914 252.841C134.426 243.899 114.75 219.652 111.661 190.912C105.882 137.15 159.028 96.0903 209.97 114.218C234.507 122.95 252.928 144.025 258.036 169.563Z" fill="#AC6B2F"/>
    </svg>
  </div>
</div>
