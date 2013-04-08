#easydian
========

#install
    install mongodb: 
    download source file from: http://www.mongodb.org/downloads
    tar zxf mongodb-linux.tgz
    mkdir -p /data/db
    chown -R $USER:$USER /data/
    bin/mongod
    shell: bin/mongo
    if any permittion issue, use sudo
    install mongoose and mongodb driver, search in github
    install rockmongo:
    sudo apt-get install apache2 php5 php-pear php5-dev
    put rockmongo to /var/www/
    restart apache2 : sudo service apache2 restart
