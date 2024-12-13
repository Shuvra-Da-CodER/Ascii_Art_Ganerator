const asciiCharacters = "@#$SN%?987654321*p+o;:,,,,,,,,.....________          ";

//code to input a local file
document.getElementById("imageUploader").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.src = e.target.result; //converting image to base64 string
      img.onload = () => {
        processImage(img);
      };
    };
    reader.readAsDataURL(file);
  }
});

function processImage(img) {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // Resize the canvas to a smaller size for ASCII conversion
  const scale = 0.1; // Adjust this scale for different output sizes
  canvas.width = img.width * scale;
  canvas.height = img.height * scale;

  // Draw the image on the canvas
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  // Get pixel data
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  // Generate ASCII art
  const asciiArt = [];
  for (let y = 0; y < canvas.height; y++) {
    let row = "";
    for (let x = 0; x < canvas.width; x++) {
      const i = (y * canvas.width + x) * 4;
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];

      // Calculate brightness
      const brightness = r*0.299+g*0.587+b*0.114;

      // Map brightness to ASCII character
      const charIndex = Math.floor(
        (brightness / 255) * (asciiCharacters.length - 1)
      );
      row += asciiCharacters[charIndex];
    }
    asciiArt.push(row);
  }

  // Display the ASCII art
  document.getElementById("ascii-art").textContent = asciiArt.join("\n");
}


//toggling light and dark modes
const button=document.getElementById("toggle")
button.addEventListener("click",()=>{
    document.body.classList.toggle("light_mode")
})