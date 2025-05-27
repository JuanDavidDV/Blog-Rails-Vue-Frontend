import { ref, onMounted } from "vue";

const API_URL = "http://localhost:3000/posts";

const posts = ref([]);
const title = ref("");
const body = ref("");
const postId = ref(0);
const isEditing = ref(false);

const fetchPosts = async () => {
  const res = await fetch(API_URL);
  const data = await res.json();
  posts.value = data;
};

  const createPost = async() => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title.value,
        body: body.value
      })
    })

    const data = await res.json();

    posts.value.push(data);
    title.value = "";
    body.value = "";
    postId.value = 0;
  };

  const deletePost = async(id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    })
    posts.value = posts.value.filter(post => post.id !== id);
  };

  const updatePost = async(id) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title.value,
        body: body.value,
        id: postId.value
      })
    })

    const data = await res.json();
    
    const index = posts.value.findIndex(post => post.id === data.id);
    posts.value[index] = data;
    
    title.value = "";
    body.value = "";
    postId.value = 0;
    isEditing.value = false;
  };

  const editPost = async(id) => {
    const post = posts.value.find(post => post.id === id);

    title.value = post.title;
    body.value = post.body;
    postId.value = post.id;
    isEditing.value = true;

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  const cancelEdit = () => {
    title.value = "";
    body.value = "";
    postId.value = 0;
    isEditing.value = false;
  };

  onMounted(fetchPosts);

  export function usePosts() {
    return {
      posts,
      title, 
      body,
      postId,
      isEditing,
      fetchPosts,
      deletePost,
      createPost,
      updatePost,
      editPost,
      cancelEdit
    }
  };
