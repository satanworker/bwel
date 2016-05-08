# Мобильное приложение BWell Trainers

## Server API

    [http://194.90.117.81:14001/BWell.Trainer.Mobile.WS.svc](http://194.90.117.81:14001/BWell.Trainer.Mobile.WS.svc)
    
## Структура проекта

/src // директория исходного кода приложения 
/www // директория рабочего приложения 
.bowerrc // конфигурирование bower для размещения front-end бибилиотек


## Порядок установки для разработки

1. скачать репозиторий
2. установить npm пакеты
3. установить bower пакеты
4. запустить ionic serve
5. запустить webpack -w

## Используемые плагины 



## Develop modules


### Bower 
- [https://libraries.io/bower/bower-ionic](https://libraries.io/bower/bower-ionic)
- [Satellizer для авторизации и работы с JWT](https://github.com/sahat/satellizer)

### Npm
- [https://github.com/MoOx/eslint-loader](https://github.com/MoOx/eslint-loader) 

### Cordova Screen Orientation Plugin 
- не использовать https://github.com/gbenvenuti/cordova-plugin-screen-orientation
- задание ориентации экрана
   
   <preference name="Orientation" value="portrait" /> 

###
https://build.phonegap.com/plugins/2755

## Правильное использование "cordova-plugin-whitelist" для PhoneGap Build

- [http://community.phonegap.com/nitobi/topics/how-to-add-cordova-plugin-whitelist-plugin-in-phonegap-build-service](http://community.phonegap.com/nitobi/topics/how-to-add-cordova-plugin-whitelist-plugin-in-phonegap-build-service)
- [https://cordova.apache.org/docs/en/edge/guide_appdev_whitelist_index.md.html](https://cordova.apache.org/docs/en/edge/guide_appdev_whitelist_index.md.html)
- [https://build.phonegap.com/plugins/3401](https://build.phonegap.com/plugins/3401)