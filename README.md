This is an exmple of how to hide your API Key in a simple, non-application html webpage.
The end result is calling the ChatGPT API obfuscated so your API Key isn't leaked and ChatGPT deactivates it.

Locally - create an ini.env and place your API key in it.

Install this application on a cloud server like railway.

Do not check the ini file into Git and instead add your key as a parameter inside your secured cloud app.

Call the application from your website, return the key, and then use the key to call ChatGPT.

Note: I included some cool css classes to use for a blinking cursor for the input box and gradient fading buttons.

HTML Code:
            <div class="chat-container" style="margin-bottom:40px">
                <input type="text" id="chatInput" class="blinking-cursor" placeholder="Type a message...">
                <p id="chatOutput" style="color:black"></p>
                <div class="btn-box">
                  <button id="sendButton" class="buttong" style="margin:20px">Send</button>
                  <button id="clearButton" class="buttong" style="margin:20px">Clear</button>
              </div>

CSS Code
.chat-container {
    width: 100%;
    background: white;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}
input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
}
input:focus {
    border-color: #007bff;
}
.blinking-cursor::after {
    content: "|";
    animation: blink 1s infinite;
}
@keyframes blink {
    50% { opacity: 0; }
}
.buttong {
    padding: 10px 15px;
    font-size: 16px;
    border: none;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    background: linear-gradient(270deg, blue, green, red, blue);
    background-size: 400% 400%;
    animation: gradientMove 3s infinite linear;
}
@keyframes gradientMove {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
}
.buttong:hover {
    filter: brightness(1.2);
}
        
Javascript
<script>
              document.getElementById('sendButton').addEventListener('click', async function() {
                try {
                  // Fetch the response from the API
                  const response = await fetch('https://awnode-production.up.railway.app/api-key');

                  // Ensure the response is ok (status code 200)
                  if (!response.ok) {
                    document.getElementById('chatOutput').textContent =  response.status;
                  }

                  // Parse the JSON response
                  const data = await response.json();

                  // Extract the 'apikey' from the JSON data
                  const apiKey = data["apiKey"];

                  // Log the entire json to check and make sure you call the parameter correctly
                  //document.getElementById('chatOutput').textContent = JSON.stringify(data, null, 2);

                  //then test output of the apiKey
                  //document.getElementById('chatOutput').textContent = apiKey;

                  //now call your API with your hidden Key
                  const chatInput = document.getElementById('chatInput');
                  const userInput = chatInput.value;
                  chatInput.value = '';
                  
                  const responseAPI = await fetch('https://api.openai.com/v1/chat/completions', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                          'Authorization': 'Bearer ' + apiKey
                      },
                      body: JSON.stringify({
                          model: 'gpt-3.5-turbo',
                          messages: [{ role: 'user', content: userInput }]
                      })
                  });
                  
                  //use another name for data and response since we already used data and response earlier
                  const dataAPI = await responseAPI.json();
                  document.getElementById('chatOutput').textContent = 'AI Response: ' + dataAPI.choices[0].message.content;

                } catch (error) 
                {
                  document.getElementById('chatOutput').textContent = error;
                }
              });
</script>
