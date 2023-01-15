<script lang="ts">
  import dayjs from 'dayjs'

  export let date: Date
  export let holidayName: string
</script>

<style lang="scss">
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .5em;
    padding-block: 2em;
    font-size: 1.3rem;

    h1 {
      margin-block: 0;
      font-size: 2em;
      font-weight: bolder;
    }

    p {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: .5em;
      max-width: 10em;
      text-align: center;
    }

    p strong {
      font-size: 1.2em;
    }
  }
</style>

<section>
  <h1>{dayjs(date).format('DD MMMM YYYY')}</h1>
  <p>
    <em>Have a happy</em>
    <strong>{holidayName}</strong>
  </p>
</section>
