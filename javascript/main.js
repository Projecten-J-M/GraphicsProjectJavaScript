const canvas = document.querySelector('#displayCanvas');
const gameManager = new GameManager(canvas);
resizeCanvas();
hookEventListeners();
renderGame();

function hookEventListeners()
{
    window.onkeydown = handleKeyDown;
    window.onkeyup = handleKeyUp;
    window.onmousedown = handleMouseDown;
    window.onmouseup = handleMouseUp;
    window.onresize = resizeCanvas;
}

function handleKeyDown(event)
{
    var keyCode = event.which;
    gameManager.handleInput(keyCode, true);
}

function handleKeyUp(event)
{
    var keyCode = event.which;
    gameManager.handleInput(keyCode, false);
}

function handleMouseDown(event)
{
    var button = event.which;
    if (button == 1)
    {
        gameManager.handleInput(button, true);
    }
}

function handleMouseUp(event)
{
    var button = event.which;
    if (button == 1)
    {
        gameManager.handleInput(button, false);
    }
}

function renderGame(){
    requestAnimationFrame(renderGame);
    gameManager.update();
}

function resizeCanvas()
{
    
    gameManager.resize();
}