<script context="module">
export async function preload(page, session) {
  let res = await this.fetch("/messages.json"); 
  let messages = await res.json(); 
  return { messages }
}

</script>

<script>
import Message from "./Message.svelte"; 
import { goto } from '@sapper/app';
export let messages = []; 
// bug: refresh is needed after new data otherwise most recent message will be undefined 
const addmessage = async (e) => {
  const newMessage = e.detail; 
    let messageToStore = newMessage.replaceAll(" ", "%20"); 
    fetch("http://localhost:8000/messages/"+messageToStore+"/facebook%20react").then(res => 
        res.json().then(messagesFromServer => {
          messages.push(newMessage); 
          messages = messages; 
      })); 
  }

let repo; // /user/repo
export let updatedMessages = []; 
messages = updatedMessages; 
const handleSearchSubmit = async () => {
  if (repo) {
      const res = await fetch("https://api.github.com/repos/"+repo+"/commits"); 
      updatedMessages = await res.json(); 
  }  
}

</script>

<style>

</style>

<h2>search for repo</h2>
<form on:submit|preventDefault={handleSearchSubmit}>
    <input bind:value={repo} type="text" placeholder="search for user/repo" /> 
    <button>Search</button>
</form>

<h2>Noted Git Commits</h2>

<ul>
	{#each updatedMessages as message}
    <Message user="temp" repo="temp" message={message.commit.message} on:addmessage={addmessage} /> 
	{/each} 
</ul>
<h1>Messages: </h1>
<ul>
	{#each messages as message }
    <li>{message.message}</li>
	{/each} 
</ul> 


