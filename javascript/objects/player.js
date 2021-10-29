function Player (scene, speed = 1)
{
    this.speed = speed;
    this.playerModel = new THREE.Object3D();

    
    var modelLoader = new THREE.GLTFLoader();
    var playerMaterial = loadTexture("../../assets/textures/PlayerDiffuse.png", "../../assets/textures/PlayerNormals.png");
    modelLoader.load(
        "../../assets/models/Player.glb",
        (function (gltf){
            this.playerModel = gltf.scene;
            gltf.scene.traverse( function( node )
            {
                if ( node.isMesh )
                { 
                    node.castShadow = true; 
                    node.receiveShadow = true;
                }
            });
            console.log(gltf);
            console.log(gltf.scene);
            console.log(this.playerModel);
            this.playerModel.position.set(25, 0, -25);
            this.playerModel.castShadow = true;
            this.playerModel.receiveShadow = true;
            this.playerModel.material = playerMaterial;
    
            scene.add(this.playerModel);
        }).bind(this)
    );
    
    

    function loadTexture(texturePath, normalPath)
    {
        if (texturePath != null)
        {
            var textureLoader = new THREE.TextureLoader();
            texture = textureLoader.load(texturePath);
            texture.encoding = THREE.sRGBEncoding;
            texture.flipY = false;

            var modelMaterial = new THREE.MeshPhongMaterial({ map: texture }); // ToDo: Normalmaps arent's working, need to be fixed.

            if (normalPath != null)
            {
                normals = textureLoader.load(normalPath);   
                normals.encoding = THREE.sRGBEncoding;
                normals.flipY = false;             
                modelMaterial.normalMap = normals;
            }
            return modelMaterial;
        }
    }

    this.move = function (camera, x = 0, y = 0, z = 0) {
        if (this.playerModel)
        {
        this.playerModel.position.set(
            this.playerModel.position.x += x * this.speed,
            this.playerModel.position.y += y * this.speed,
            this.playerModel.position.z += z * this.speed
        );
        camera.position.set(
            camera.position.x += x * this.speed,
            camera.position.y += y * this.speed,
            camera.position.z += z * this.speed
        );
        }
    }
}