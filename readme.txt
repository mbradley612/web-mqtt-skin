Installation
============

To install, use wee_extension

wee_extension --install web-mqtt-skin-0.1.zip

You should see output like this:

Request to install 'web-mqtt-skin-0.1.zip'
Extracting from zip archive web-mqtt-skin-0.1.zip
Saving installer file to /usr/share/weewx/user/installer/web-mqtt-skin
Saved configuration dictionary. Backup copy at /etc/weewx/weewx.conf.20200411140356
Finished installing extension 'web-mqtt-skin-0.1.zip'


Configuration
=============

The installer will automatically add the following section to weewx.conf under [StdReport]

    [[web-mqtt]]
        HTML_ROOT = /var/www/html/weewx/web-mqtt
        skin = web-mqtt


For most installations, this will be appropriate.

You will need to configure the skin.conf, this is normally in /etc/weewx/


Uninstall
=========

sudo wee_extension --uninstall web-mqtt-skin