<template>
    <div class="home">
        <MessageList />

        <v-row
            class="pa-5"
            style="
            z-index: 1;
            position: sticky;
            background-color: white;
            width: 100%;
            right: 0;
            bottom:0;">
            
            <v-textarea
                max-rows="5"
                variant="solo-filled"
                label="Write a message..."
                row-height="15"
                rows="1"
                class="ma-2"
                auto-grow
            />

            <v-btn icon="mdi-send" size="large" class="ma-2"/>
        </v-row>
    </div>
</template>

<script>
import MessageList from '@/components/MessageList.vue'

export default {
    name: 'HomeView',
    components: {
        MessageList
    }
}
</script>
