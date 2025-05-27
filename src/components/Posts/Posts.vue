<template>
  <div class="post">
    <h1 class="title">Posts</h1>
    <input type="text"
          v-model="title"
          placeholder="Title"
          class="title-input"
    />
    <input type="text"
          v-model="body"
          placeholder="Body"
          class="body-input"
    />
    <div>
        <!-- only renders if editing the post-->
      <button v-if="isEditing" @click="updatePost(postId)" class="update-botton">Update</button>
      <button v-if="isEditing" @click="cancelEdit">Cancel</button>
            
      <!--only renders if not editing the post-->
      <button v-else @click="handleCreate">Create</button>
    </div>

    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script setup>
  import "./Posts.css"
  import { usePosts } from "../../composables/usePost";
  import { ref } from "vue";

  const error = ref("");

  const {
    title, 
    body,
    postId, 
    isEditing,
    createPost, 
    updatePost,
    cancelEdit
  } = usePosts();

  const handleCreate = async() => {
    if(!title.value.trim() ||  !body.value.trim()) {
      error.value = "Title or Body cannot be empty!"
      return;
    }

    error.value= ""; // Clears error message
    await createPost();
  }
</script>
