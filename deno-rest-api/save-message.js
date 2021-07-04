export async function saveMessage(message, messages) {
    messages.push(message); 
    await Deno.writeTextFile('./data.json', JSON.stringify(messages)); 
    return messages; 
}
