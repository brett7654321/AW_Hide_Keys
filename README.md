Create an ini.env and place your API key in it.

Install this application on a cloud server like railway.

Call the application from your website.

  <button onclick="fetchData()">Fetch Data</button>
    <pre id="output"></pre>

    <script>
        async function fetchData() {
            try {
                const response = await fetch("https://yourhostedapp.com/api/data");
                const data = await response.json();
                document.getElementById("output").textContent = JSON.stringify(data, null, 2);
            } catch (error) {
                console.error("Error:", error);
            }
        }
    </script>
