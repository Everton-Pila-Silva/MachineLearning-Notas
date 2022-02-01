    const URL = "https://teachablemachine.withgoogle.com/models/Flkr87p4g/";

    let model, webcam, labelContainer, maxPredictions;

    // Load the image model and setup the webcam
    async function init() {
        
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        
        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        // Note: the pose library adds "tmImage" object to your window (window.tmImage)
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);

        // append elements to the DOM
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        document.getElementById('some').innerHTML = '';
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
    }
    var j = 0;
    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }

    // run the webcam image through the image model
    async function predict() {

        const prediction = await model.predict(webcam.canvas);
        
        
        for (let i = 0; i < maxPredictions; i++) {
    
         if(prediction[i].probability > 0.95){
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
         }else{
            labelContainer.childNodes[i].innerHTML = "-";
         
        }  
            
            if(prediction[i].className = '2 Reais' & prediction[i].probability == 0.99 ){
                const music = new Audio('2reais.mp3');
                music.play();
              
             }
             if(prediction[i].className = '10 Reais'  & prediction[i].probability == 0.99){
                const music = new Audio('10reais.mp3');
                music.play();
               
            }
              if(prediction[i].className = '5 Reais'  & prediction[i].probability == 0.99 ){
                const music = new Audio('5reais.mp3');
                music.play();
               
            }
               if(prediction[i].className = '50 Reais'  & prediction[i].probability == 0.99){
                const music = new Audio('50reais.mp3');
                music.play();
                
            }
             

      
        }
  
 
    }
     
