FROM php:7.3-fpm-alpine3.10

RUN apk update && apk add \
    git \
    libzip-dev \
    zip \
    unzip \
    autoconf \
    dpkg-dev \
    dpkg \
    file \
    g++ \
    gcc \
    libc-dev \
    make \
    re2c \
    openldap-dev

RUN docker-php-ext-configure zip --with-libzip \
    && docker-php-ext-configure ldap --with-libdir=lib/

RUN docker-php-ext-install \
    bcmath \
    ldap \
    pdo_mysql \
    zip

RUN curl --silent --show-error https://getcomposer.org/installer | php && \
    mv composer.phar /usr/local/bin/composer