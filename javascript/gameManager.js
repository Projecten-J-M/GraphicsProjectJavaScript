function GameManager(canvas)
{
    var startTime = new Date().getTime();
    const action = {Shoot:false,Left:false,Backward:false,Forward:false,Right:false}

    setupScene();
    setupLighting();
    setupCamera();

    this.handleInput = function(inputCode, isDown)
    {
        switch (inputCode){
            // Left-mouse
            case 1:
                action.Shoot = isDown;
                break;
            // Keycode: A
            case 65:
                action.Left = isDown;
                break;
            // Keycode: S
            case 83:
                action.Backward = isDown;
                break;
            // Keycode: W
            case 87:
                action.Forward = isDown;
                break;
            // Keycode: D
            case 68:
                action.Right = isDown;
                break;
        }
    }

    this.resize = function()
    {
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    // ToDo: Rewrite function more efficient.
    function setupCamera(){
        const fov = 75;
        const aspect = 2;  // the canvas default
        const near = 0.1;
        const far = 5;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this.camera = camera;
    }

    function setupLighting(){
        
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.castShadow = true;
        light.position.set(0, 10, 10);
        light.target.position.set(-4, 0, -4);
        scene.add(light);
        scene.add(light.target);
    
    }

    function setupScene(){
        this.renderer = new THREE.WebGLRenderer({ canvas });
        this.scene = new THREE.Scene();
    }

    this.update = function()
    {
        frameStartTime = new Date().getTime();
        // Custom time function, could be used to calculate new positions, rotations etc.
        deltaTime = (new Date().getTime()) - startTime;
        deltaTime *= 0.001;
        if (action.Forward == true)
        {
            // Rotate cubes out of the cubes list:
            cubes.forEach((cube, ndx) => {
                const speed = 1 + ndx * .1;
                const rot = deltaTime * speed;
                cube.rotation.x = rot;
                cube.rotation.y = rot;
            });
        }
       renderer.render(scene, camera);
       frameEndTime = (new Date().getTime()) - frameStartTime;
       
       // Input system test:
       //console.log("Action: Shoot, Status: " + action.Shoot);
       //console.log("Action: Left, Status: " + action.Left);
       //console.log("Action: Backward, Status: " + action.Backward);
       //console.log("Action: Forward, Status: " + action.Forward);
       //console.log("Action: Right, Status: " + action.Right);
       
      // Time test
      //console.log(deltaTime);
      //console.log("FPS: " + 1000/frameEndTime);
    }

}