<script>

import ProjectHome from '@/components/Apps/Home/Home.vue'
import WriterHome from '@/components/Apps/Writer/Home.vue'
import MindmapHome from '@/components/Apps/Mindmap/Home.vue'
import TimelineHome from '@/components/Apps/Timeline/Home.vue'
import SnowflakeHome from '@/components/Apps/Snowflake/Home.vue'
import GridplannerHome from '@/components/Apps/Gridplanner/Home.vue'
import CardsdatabaseHome from '@/components/Apps/Cardsdatabase/Home.vue'

export default {
  name: 'App Home',
  components: {
    ProjectHome,
    WriterHome,
    MindmapHome,
    TimelineHome,
    SnowflakeHome,
    GridplannerHome,
    CardsdatabaseHome
  },
  data() {
    return {
    };
  }
  };
</script>

<template>
<ProjectHome v-if="!$root.currentTool" />
<WriterHome v-if="$root.currentTool === 'writer'" />
<MindmapHome v-if="$root.currentTool === 'mindmap'" />
<TimelineHome v-if="$root.currentTool === 'timeline'" />
<SnowflakeHome v-if="$root.currentTool === 'snowflake'" />
<GridplannerHome v-if="$root.currentTool === 'gridplanner'" />
<CardsdatabaseHome v-if="$root.currentTool === 'cardsdatabase'" />
</template>