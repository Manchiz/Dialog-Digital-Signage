 function myfunction() {
            const tt = document.getElementById('inText').value;
           
            console.log(tt);

            const width = 64;
            const height = 16;

            var canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
           
            var ctx = canvas.getContext("2d");
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          
            ctx.fillStyle = 'black';
            ctx.font = 'bold 10px Impact ';
            ctx.fillText(tt,5,11);
                       
            var img = document.createElement("img");
            document.body.appendChild(img);

            var myImage = canvas.toDataURL("image/png"); 
            document.getElementById("cimg").src = myImage;

            // binEncode(tt);

            // var dataInBase64 = $(canvas)[0].toDataURL('image/png').replace(/tt\:image\/png;base64,/, '');
            // console.log(dataInBase64);
            // var bin = binEncode(dataInBase64);
            // console.log(bin);()
            var imgData = ctx.getImageData(0, 0, width, height).data;
// 
            decodePNG(imgData);

        }



function decodePNG(data) {

      console.log('Decode Start');

      const img = "sitepointlogo-withsmile.png";
      
      // PNG.decode('sitepointlogo-withsmile.png', function(data) {
      // PNG.decode(img, function(data) {

      
      serialMessage = '';
      
      for (i = 0; i < data.length; i+=4) {
      var red = data[i],
            green = data[i+1],
            blue = data[i+2],
            luminance = ((red * 299) + (green * 587) + (blue * 114)) / 1000;
      
      if (luminance > 150) {
        serialMessage += '0';
      } else {
        serialMessage += '1';
      }
      }

      setTimeout(function() {
      
      console.log(serialMessage);

      }, 2000);
      // });

      // const pp = "sdsd"
      document.getElementById("binr").innerHTML = serialMessage;
}