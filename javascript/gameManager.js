function GameManager(canvas)
{
    var startTime = new Date().getTime();
    const action = {Shoot:false,Left:false,Backward:false,Forward:false,Right:false}

    setupScene();
    setupLighting();
    setupCamera();
    console.log(scene);

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

    function loadMap(){
        loadGLTFObject("../assets/models/Arches.glb", "../assets/textures/ArchesDiffuse.png", "../assets/textures/ArchesNormals.png", 17.5466, 0.5125, -37.0221);
        loadGLTFObject("../assets/models/Base.glb");
        loadGLTFObject("../assets/models/Bat.glb", "../assets/textures/BatDiffuse.png", "../assets/textures/BatNormals.png", 0.635387, 5.30846, -40.9824);
        loadGLTFObject("../assets/models/Blox.glb", "../assets/textures/BloxDiffuse.png", null, 36.9583, 0.798581, -24.6742);
        loadGLTFObject("../assets/models/Clock.glb", "../assets/textures/ClockDiffuse.png", "../assets/textures/ClockNormals.png", 3.62922, 0, -19.8345);
        loadGLTFObject("../assets/models/DollArm.glb", "../assets/textures/DollArmDiffuse.png", "../assets/textures/DollArmNormals.png", 43.6546, 0, -35.9031);
        loadGLTFObject("../assets/models/Dollhouse.glb", "../assets/textures/DollhouseDiffuse.png", "../assets/textures/DollhouseNormals.png", 34.3578, 0, -3.36421);
        loadGLTFObject("../assets/models/Drawers.glb", "../assets/textures/DrawersDiffuse.png", "../assets/textures/DrawersNormals.png", 4.3, 0, -10.4121);
        loadGLTFObject("../assets/models/Firetruck.glb", "../assets/textures/FiretruckDiffuse.png", "../assets/textures/FiretruckNormals.png", 7.53786, 0.769853, -36.8926);
        loadGLTFObject("../assets/models/Hearse.glb", "../assets/textures/HearseDiffuse.png", "../assets/textures/HearseNormals.png", 13.4313, 1.94064, -24.6359);
        loadGLTFObject("../assets/models/Planks.glb", "../assets/textures/PlanksDiffuse.png", "../assets/textures/PlanksNormals.png");
        loadGLTFObject("../assets/models/Robot.glb", "../assets/textures/RobotDiffuse.png", "../assets/textures/RobotNormals.png", 22.9302, 0, -10.5714);
        loadGLTFObject("../assets/models/SpinningTop.glb", "../assets/textures/SpinningTopDiffuse.png", "../assets/textures/SpinningTopNormals.png", 24.6155, 0.440388, -18.6914);
        loadGLTFObject("../assets/models/Stars.glb");
        loadGLTFObject("../assets/models/Stool.glb", "../assets/textures/StoolDiffuse.png", "../assets/textures/StoolNormals.png", 31.1626, 4.37695, -40.1877);
        loadGLTFObject("../assets/models/Train.glb", "../assets/textures/TrainDiffuse.png", "../assets/textures/TrainNormals.png", 37.2807, 0, -16.0358);
        loadGLTFObject("../assets/models/Wall.glb", "../assets/textures/WallDiffuse.png", "../assets/textures/WallNormals.png");
    }

    function loadPlayer(){
        this.player = new Player(this.scene, 4);
    }

    function loadGLTFObject(modelPath, texturePath = null, normalPath = null, x = 0, y = 0, z = 0, rotX = 0, rotY = 0, rotZ = 0, scaleX = 1, scaleY = 1, scaleZ = 1){        
        var modelLoader = new THREE.GLTFLoader();

        if (texturePath != null)
        {
            var textureLoader = new THREE.TextureLoader();
            texture = textureLoader.load(texturePath);
            texture.encoding = THREE.sRGBEncoding;
            texture.flipY = false;
            var modelMaterial = new THREE.MeshPhongMaterial({ map: texture, normalMap: null }); // ToDo: Normalmaps arent's working, need to be fixed.


            if (normalPath != null)
            {
                normals = textureLoader.load(normalPath);   
                normals.encoding = THREE.sRGBEncoding;
                normals.flipY = false;             
                modelMaterial.normalMap = normals;
            }
        }

        modelLoader.load(
            modelPath,
            (function (gltf){
                model = gltf.scene;
                gltf.scene.traverse( function( node )
                {
                    if ( node.isMesh )
                    { 
                        node.castShadow = true; 
                        node.receiveShadow = true;
                    }
                });

                model.position.set(x, y, z);
                model.rotation.x = rotX;
                model.rotation.y = rotY;
                model.rotation.z = rotZ;
                model.scale.set(scaleX, scaleY, scaleZ);
                model.castShadow = true;
                model.receiveShadow = true;

                model.material = modelMaterial;
                scene.add(model);
            })
        );
    }

    this.resize = function()
    {
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    // ToDo: Rewrite function more efficient.
    function setupCamera(){
        const near = 0.1;
        const far = 1000;
        const camera = new THREE.OrthographicCamera(-canvas.width, canvas.width, canvas.height, -canvas.height, near, far);
        this.camera = camera;
        camera.zoom = 2;
        camera.position.set(52.5, 25, -52.5);
        camera.rotation.x = 0.71681469;
        camera.rotation.y = 2.5;
        camera.rotation.z = 5.83362938;
    }



    function setupLighting(){
        
        const color = 0xFFFFFF;
        const intensity = 2;
        const light = new THREE.DirectionalLight(color, intensity);
        light.castShadow = true;
        light.position.set(30, 10, -50);
        light.target.position.set(0, 0, 0);
        scene.add(light);
        scene.add(light.target);

    }

    function updatePosition(event) {
        camera.rotation.order = 'YZX'
        let { movementX, movementY } = event
        let rotateSpeed = 0.002
        player.rotation.y -= movementX * rotateSpeed
        camera.rotation.x -= movementY * rotateSpeed
        camera.rotation.x = Math.max(-Math.PI / 2, Math.min(camera.rotation.x, Math.PI / 2))
        camera.rotation.order = 'XYZ'
    }

    // renderer.domElement.onclick = () =>
    // renderer.domElement.requestPointerLock()
    // document.addEventListener('pointerlockchange', lockChangeAlert, false);
    // document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

    // function lockChangeAlert() {
    //     if (document.pointerLockElement == renderer.domElement) {
    //         document.addEventListener("mousemove", updatePosition, false)
    //     } else {
    //         document.removeEventListener("mousemove", updatePosition, false)
    //     }
    // }
    
    function checkToMove() {
        let moveX = 0;
        let moveZ = 0;
        if(action.Forward) {
            moveZ += 0.01;
        }
        if(action.Backward) {
            moveZ -= 0.01;
        }

        if(action.Right) {
            moveX -= 0.01;
        }
        if(action.Left) {
            moveX += 0.01;
        }
        player.move(camera, moveX, 0, moveZ);
    }

    function setupScene(){
        this.renderer = new THREE.WebGLRenderer({ canvas });
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.scene = new THREE.Scene();
        this.scene.castShadow = true;
        this.scene.receiveShadow = true;
        this.renderer.shadowMap.enabled = true;
        loadMap();
        loadPlayer();

        var geo = new THREE.PlaneBufferGeometry(2000, 2000, 8, 8);
        var mat = new THREE.MeshBasicMaterial({ color: 0x000000 });
        var plane = new THREE.Mesh(geo, mat);

        scene.add(plane);
    }

    

    this.update = function()
    {
        frameStartTime = new Date().getTime();
        // Custom time function, could be used to calculate new positions, rotations etc.
        deltaTime = (new Date().getTime()) - startTime;
        deltaTime *= 0.001;

        checkToMove();

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