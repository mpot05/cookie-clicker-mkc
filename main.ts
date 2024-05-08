namespace projectImages {
    export const Cookie = assets.image`Cookie`;
    export const Pointer = assets.image`Pointer`;
    export const Man1 = assets.image`man1`;
    export const Auto1 = assets.image`auto1`;
}

namespace SpriteKind {
    export const Cookie = SpriteKind.create()
    export const Man1 = SpriteKind.create()
    export const Auto1 = SpriteKind.create()
}
scene.setBackgroundColor(9)

let count = 0
let auto = 0
let clickpower = 1
let man1Cost = 25
let auto1Cost = 50

let man1: Sprite = sprites.create(projectImages.Man1.doubled(), SpriteKind.Man1)
man1.setPosition(40, 40)
let auto1: Sprite = sprites.create(projectImages.Auto1.doubled(), SpriteKind.Auto1)
auto1.setPosition(120, 40)

let cookie: Sprite = sprites.create(projectImages.Cookie, SpriteKind.Cookie)
let pointer: Sprite = sprites.create(projectImages.Pointer, SpriteKind.Player)
pointer.changeScale(0.00000000000000000000000001, ScaleAnchor.Middle)
cookie.changeScale(1, ScaleAnchor.Middle)
pointer.setStayInScreen(true)
controller.moveSprite(pointer)
info.showScore(true)



controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
    if (pointer.overlapsWith(cookie)) {
        count += clickpower
        info.setScore(count)
    }
    else if (pointer.overlapsWith(man1)) {
        if (count >= man1Cost) {
            count -= man1Cost
            man1Cost *= 1.25
            clickpower += 1
            info.setScore(count)
        }
        else {
            man1.sayText("Cost:" + Math.round(man1Cost), 1000)
        }
    }
    else if (pointer.overlapsWith(auto1)) {
        if (count >= auto1Cost) {
            count -= auto1Cost
            auto1Cost *= 1.25
            auto += 1
            info.setScore(count)
        }
        else {
            auto1.sayText("Cost:" + Math.round(auto1Cost), 1000)
        }
    }

})

game.onUpdateInterval(500, () => {
    info.setScore(count)
})

game.onUpdateInterval(1000, () => {
    count += auto
    info.setScore(count)
})
