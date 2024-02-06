document.addEventListener("DOMContentLoaded", function () {
  const channelsContainer = document.getElementById("channels");
  const responsePromise = fetch(
    "https://api.sr.se/api/v2/channels/?format=json"
  );
  responsePromise
    .then((response) => response.json())
    .then((data) => {
      data.channels.forEach((channel) => {
        const channelDiv = document.createElement("div");
        channelDiv.className = "channel";
        channelDiv.style.backgroundColor = "#" + channel.color;
        const channelContentDiv = document.createElement("div");
        channelContentDiv.className = "channel-content";
        channelContentDiv.innerHTML = `
            <img src="${channel.image}" alt="${channel.name}" />
            <div class="right">
            <h2>${channel.name}</h2>
            <p class="channel-description">${channel.tagline}</p>
            <audio controls>
              <source class="audio" src="${channel.liveaudio.url}" type="audio/mpeg" />
            </audio>
            </div>
            <hr/>
          `;
        channelDiv.appendChild(channelContentDiv);
        channelsContainer.appendChild(channelDiv);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});
