<script>
import { goto } from "@sapper/app"; 
let repo; 
const handleSubmit = async () => {
    if (repo) {

    }
}
</script>

<h2>search for repo</h2>
<form on:submit|preventDefault={handleSubmit}>
    <input bind:value={repo} type="text" placeholder="search for user/repo" /> 
    <button>Search</button>
</form>