<script lang="ts">
  import type { PageData } from './$types'
  import TitleSection from '$components/TitleSection.svelte'
	import PotSection from '$components/PotSection.svelte'
	import SpoonCursor from '$components/SpoonCursor.svelte'

  // Get server data
  export let data: PageData
  let { holidayName, date } = data
</script>

<style lang="scss">
  main {
    margin: 0;
    padding: 0;
  }
</style>

<main>
  <SpoonCursor />
  <TitleSection {date} {holidayName} />
  <PotSection />
</main>
