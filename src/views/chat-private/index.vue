<template>
  <Container
    ><div>
      {{ this.$route.params.id }}
    </div>
  </Container>
</template>

<script>
import Container from "@/components/ChatContainer/index.vue";
export default {
  components: {
    Container,
  },
};
</script>
