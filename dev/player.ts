import { Game } from "./game.js"
import { TurnableGameObject } from "./turnableGameObject.js"

export class Player extends TurnableGameObject{
    private tempX : number = 0
    private tempY : number = 0
    private game : Game
    public ammo : number = 20
    public health : number = 40
    public kills : number = 0
    
    
    constructor(g:Game){
        super("Player");
        this.game = g
        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e:KeyboardEvent) => this.onKeyUp(e))
        this.x = 0
        this.y = 150
        this.ySpeed = 0
        this.xSpeed = 0
    }

    public update(){
        this.tempX = this.x + this.xSpeed
        this.tempY = this.y + this.ySpeed

        if(this.tempX < 0  || this.tempX > window.innerWidth - this.div.clientWidth) {
            this.xSpeed = 0
        } 
        else{
            this.x += this.xSpeed
        }

        if(this.tempY < 0  || this.tempY > window.innerHeight - this.div.clientHeight) {
            this.ySpeed = 0
        } 
        else{
            this.y += this.ySpeed
        }
        super.update()
    }
    
    private onKeyDown(e: KeyboardEvent): void {
        switch (e.key) {
            case "a":
            case "ArrowLeft" :
                if (this.game.paused == false){
                this.xSpeed = -5
                this.angle = 90
                this.game.direction = "left"
                }
                break
            case "d":
            case "ArrowRight":
                if (this.game.paused == false){
                this.xSpeed = 5
                this.angle = 270
                this.game.direction = "right"
                }
                break
            case "w":
            case "ArrowUp" :
                if (this.game.paused == false){
                this.ySpeed = -5
                this.angle = 180
                this.game.direction = "up"
                }
                break
            case "s":
            case "ArrowDown":
                if (this.game.paused == false){
                this.ySpeed = 5
                this.angle = 0
                this.game.direction = "down"
                }
                break
            case " ":
                break
            case "e":
                if (this.game.paused == false){
                this.game.ePressed = true
                }
                break
            case "Escape":
                if (this.game.currentGame == true && this.health > 0 && this.game.collectedDisks < 3){
                this.game.pauseScreen()
                }
        }
    }

    

    private onKeyUp(e: KeyboardEvent): void {      
            if (e.key === " " && this.game.paused == false){
                if (this.ammo > 0){
                this.game.addBullet()
                this.ammo --
                } else{
                    console.log("Out of Ammo!")
                }
            }     
            if (e.key == "d" ||e.key == "a" || e.key ==  "ArrowLeft" || e.key == "ArrowRight") {
                this.xSpeed = 0
            }
            if (e.key == "w" || e.key == "s" || e.key == "ArrowDown" || e.key == "ArrowUp") {
                this.ySpeed = 0
            }
            if (e.key == "e"){
                this.game.ePressed = false
            }
            
            
            
        }

        
    }



