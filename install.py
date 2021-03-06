# installer for the 'web-mqtt' skin
# Copyright 2020 Matthew Bradley

from weecfg.extension import ExtensionInstaller


def loader():
    return BasicInstaller()


class BasicInstaller(ExtensionInstaller):
    def __init__(self):
        super(BasicInstaller, self).__init__(
            version="0.14",
            name='web-mqtt-skin',
            description='HTML from MQTT loop',
            author="Matthew Bradley",
            author_email="mbradley612@github.com",
            config={
                'StdReport': {
                    'web-mqtt': {
                        'skin': 'web-mqtt',
                        'HTML_ROOT': 'web-mqtt'}}},
            files=[('skins/web-mqtt',
                    ['skins/web-mqtt/skin.conf',
                      'skins/web-mqtt/index.html.tmpl',
                     'skins/web-mqtt/update-live-weather-mqtt.js',
                     ]),
                   ]
        )