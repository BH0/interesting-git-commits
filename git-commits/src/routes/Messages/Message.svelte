<script>
import { createEventDispatcher } from "svelte";
const dispatch = createEventDispatcher();
  
export let message; 
export let repo; 
export let username; 
const handleClick = () => {
    dispatch("addmessage", message); 
} 

</script>

<div>
<b>message: </b> {message}
<b>repo: </b> {repo}
<b>user: </b> {username}
<button on:click={handleClick}>+</button>
<br />
</div>
