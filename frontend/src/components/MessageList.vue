<template>
  <v-list
    :items="items"
    style="height: 100%; margin-top: 64px"
    lines="three"
    item-props
  >
    <template v-slot:subtitle="{ subtitle }">
      <div v-html="subtitle"></div>
    </template>
  </v-list>
</template>
<script>
export default {
  data: () => ({
    items: [
      {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: 'Alex',
        subtitle: `&mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
      },
      {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'John',
        subtitle: `&mdash; Wish I could come, but I'm out of town this weekend.`,
      },
      {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Maria',
        subtitle:
          '&mdash; Do you have Paris recommendations? Have you ever been?',
      },
      {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        title: 'Kate',
        subtitle:
          '&mdash; Have any ideas about what we should get Heidi for her birthday?',
      },
      {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        title: 'Sora',
        subtitle:
          '&mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
      },
      {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: 'Alex',
        subtitle: `&mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
      },
      {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'John',
        subtitle: `&mdash; Wish I could come, but I'm out of town this weekend.`,
      },
      {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Maria',
        subtitle:
          '&mdash; Do you have Paris recommendations? Have you ever been?',
      },
      {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        title: 'Kate',
        subtitle:
          '&mdash; Have any ideas about what we should get Heidi for her birthday?',
      },
      {
        prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        title: 'Sora',
        subtitle:
          '&mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
      },
    ],
  }),
};
</script>
