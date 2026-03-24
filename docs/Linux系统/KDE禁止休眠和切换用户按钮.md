# KDE禁止休眠和切换用户按钮

## 备份文件

`sudo cp /usr/share/plasma/look-and-feel/org.kde.breeze.desktop/contents/lockscreen/LockScreenUi.qml /usr/share/plasma/look-and-feel/org.kde.breeze.desktop/contents/lockscreen/LockScreenUi.qml.bak`

##  修改文件

`sudo nano /usr/share/plasma/look-and-feel/org.kde.breeze.desktop/contents/lockscreen/LockScreenUi.qml`

```qml
<!-- 禁止休眠按钮 -->
ActionButton {
    text: i18nd("plasma_lookandfeel_org.kde.lookandfeel", "Sleep")
    iconSource: "system-suspend"
    onClicked: root.suspendToRam()
    visible: false
},
<!-- 禁止切换用户按钮 -->
ActionButton {
    text: i18nd("plasma_lookandfeel_org.kde.lookandfeel", "Switch User")
    iconSource: "system-switch-user"
    onClicked: {
        // If there are no existing sessions to switch to, create a new one instead
        if (((sessionsModel.showNewSessionEntry && sessionsModel.count === 1) ||
            (!sessionsModel.showNewSessionEntry && sessionsModel.count === 0)) &&
            sessionsModel.canSwitchUser) {
            mainStack.pop({immediate:true})
            sessionsModel.startNewSession(true /* lock the screen too */)
            lockScreenRoot.state = ''
        } else {
            mainStack.push(switchSessionPage)
        }
    }
    visible: false
}
```