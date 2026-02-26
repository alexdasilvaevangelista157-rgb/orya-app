const supabaseUrl = "https://qflchnlaxtqgfvtqgtsl.supabase.co";
const supabaseKey = "sb_publishable_OFch53maJWq8evi16POsQQ_8z3Fp916";

const client = supabase.createClient(supabaseUrl, supabaseKey);

const authScreen = document.getElementById("auth-screen");
const app = document.getElementById("app");
const feed = document.getElementById("feed");

async function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await client.auth.signUp({ email, password });

  if (error) {
    alert(error.message);
  } else {
    alert("Conta criada!");
  }
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await client.auth.signInWithPassword({ email, password });

  if (error) {
    alert(error.message);
  } else {
    showApp();
  }
}

async function logout() {
  await client.auth.signOut();
  location.reload();
}

async function createPost() {
  const { data: userData } = await client.auth.getUser();
  const content = document.getElementById("postContent").value;

  if (!content) return;

  await client.from("posts").insert([
    {
      user_id: userData.user.id,
      content: content,
      country: "Brasil"
    }
  ]);

  document.getElementById("postContent").value = "";
  loadPosts();
}

async function loadPosts() {
  const { data } = await client
    .from("posts")
    .select("content, country")
    .order("created_at", { ascending: false });

  feed.innerHTML = "";

  data.forEach(post => {
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `<strong>${post.country}</strong>${post.content}`;
    feed.appendChild(div);
  });
}

function showApp() {
  authScreen.classList.add("hidden");
  app.classList.remove("hidden");
  loadPosts();
}

client.auth.getSession().then(({ data }) => {
  if (data.session) {
    showApp();
  }
});
