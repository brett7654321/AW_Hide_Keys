Create an ini.env and place your API key in it.

Install this application on a cloud server like railway.

Call the application from your website.

  <button onclick="fetchData()">Fetch Data</button>
    <pre id="output"></pre>

   <script>
              document.getElementById('sendButton').addEventListener('click', async function() {
                try {
                  // Fetch the response from the API
                  const response = await fetch('https://xxxxxxxxxx.app/api-key');

                  // Ensure the response is ok (status code 200)
                  if (!response.ok) {
                    document.getElementById('Output').textContent =  response.status;
                  }

                  // Parse the JSON response
                  const data = await response.json();

                  // Extract the 'apiKey' from the JSON data
                  const apiKey = data["apiKey"];

                  // Log the entire json to check and make sure you call the parameter correctly
                  document.getElementById('Output').textContent = JSON.stringify(data, null, 2);

                  //then actually output the apiKey
                  document.getElementById('Output').textContent = apiKey;

                } catch (error) 
                {
                  document.getElementById('Output').textContent = error;
                }
              });
            </script>
