<template>
  <v-card-actions>
    <v-btn
      class="text-none"
      color="primary"
      rounded="xl"
      text="Add contact"
      variant="flat"
      max-width="20%"
    />
    <v-btn
      class="text-none"
      color="primary"
      rounded="xl"
      text="Add contact"
      variant="flat"
      max-width="20%"
    />
  </v-card-actions>
</template>

<script lang="ts">
import { Users } from '@/types';
export default {
  props: {
    user: Object as () => Users,
  },
};
</script>
